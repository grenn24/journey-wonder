import { Modal } from "antd";
import React from "react";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}
const CreateModal = (
	{openCreateModal, setOpenCreateModal} :Prop
) => {
	return (
		<Modal
			open={openCreateModal}
			onCancel={() => setOpenCreateModal(false)}
			width={650}
		></Modal>
	);
};

export default CreateModal;
