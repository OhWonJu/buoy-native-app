import React from "react";
import { useMutation, useQueryClient } from "react-query";

import GroupDataFormView from "./GroupDataFormView";
import { _GROUP_CREATE, _GROUP_EDIT } from "../../../../utils/Api";

export default GroupEidtModal = ({
  modalVisible,
  setModalVisible,
  groupId,
  oldGroupName,
  oldgroupSystem,
  oldPlainBuoy,
  setGroupInfo,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(_GROUP_EDIT, {
    onSuccess: () => {
      // mutation 성공시 기존 데이터를 오래된 데이터로 강제로 간주
      queryClient.invalidateQueries(["groupData"]);
    },
  });
  const onRegist = async (data) => {
    setGroupInfo((prevState) => {
      return {
        ...prevState,
        group_name: data.groupName,
        group_system: data.groupSystem,
        plain_buoy: parseInt(data.plainBuoy),
      };
    });
    setModalVisible(false);
    mutate(
      {
        group_id: groupId,
        group_name: data.groupName,
        group_system: data.groupSystem,
        plain_buoy: parseInt(data.plainBuoy),
      },
      {
        onError: () => alert("구역 수정에 실패했습니다."),
      }
    );
  };

  return (
    <GroupDataFormView
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalTitle={"구역 수정"}
      oldeGroupName={oldGroupName}
      oldGroupSystem={oldgroupSystem}
      oldPlainBuoy={oldPlainBuoy}
      confirm={onRegist}
    />
  );
};
