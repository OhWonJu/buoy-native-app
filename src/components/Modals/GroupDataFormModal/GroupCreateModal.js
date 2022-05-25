import React from "react";
import { useMutation, useQueryClient } from "react-query";

import GroupDataFormView from "./GroupDataFormView";
import { _GROUP_CREATE } from "../../../../utils/Api";

export default GroupCreateModal = ({
  modalVisible,
  setModalVisible,
  onRefresh,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(_GROUP_CREATE, {
    onSuccess: () => {
      // mutation 성공시 기존 데이터를 오래된 데이터로 강제로 간주
      queryClient.invalidateQueries(["groupData"]);
      queryClient.invalidateQueries(["mainData", "groupTotal"]);
    },
  });
  const onRegist = async (data) => {
    mutate(
      {
        group_name: data.groupName,
        group_system: data.groupSystem,
        plain_buoy: parseInt(data.plainBuoy),
      },
      {
        onSuccess: () => {
          setModalVisible(false);
          onRefresh();
        },
        onError: () => alert("구역 생성에 실패했습니다."),
      }
    );
  };

  return (
    <GroupDataFormView
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalTitle={"새 구역 만들기"}
      confirm={onRegist}
    />
  );
};
