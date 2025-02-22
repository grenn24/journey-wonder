import { Image, Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import {
	RcFile,
	UploadFileStatus,
	UploadListType,
} from "antd/es/upload/interface";
import React, { JSX, useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/ant.css"
import {AnimatePresence, motion} from "motion/react"

interface CustomImageRenderProp {
	image: File;
	handleDelete: () => void;
}
interface Prop {
	maxUploads?: number;
	multipleUploads?: boolean;
	aspectRatio?: number;
	uploadUrl?: string;
	CustomImageRender?: React.FC<CustomImageRenderProp>;
	defaultImageRenderType?: "square" | "circle" | "list" | "none" | "block";
	setImages: (images: File[]) => void;
	images: File[];
	preview?: boolean;
	acceptedFileTypes?: string;
	message?: string | JSX.Element;
	className?: string;
	hideOnMaxUpload?: boolean;
}
const defaultImageRenderTypes: Record<string, UploadListType | undefined> = {
	square: "picture-card",
	circle: "picture-circle",
	list: "picture",
	none: undefined,
};
const ImageUpload = ({
	maxUploads = 1,
	multipleUploads = false,
	aspectRatio = 1,
	uploadUrl,
	CustomImageRender,
	defaultImageRenderType = "square",
	setImages,
	images,
	preview = true,
	acceptedFileTypes = "image/*",
	message = "+ Upload File",
	className,
	hideOnMaxUpload = false,
}: Prop) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [previewImage, setPreviewImage] = useState<File | undefined>(
		undefined
	);

	const onChange: UploadProps["onChange"] = ({ fileList }) => {
		setFileList(fileList);
		setTimeout(()=>setImages(fileList.map((file) => file.originFileObj as File)),500);
	};
	const onPreview = async (file: UploadFile) => {
		setPreviewImage(file.originFileObj as File);
		console.log(previewImage);
		previewImage && console.log(URL.createObjectURL(previewImage));
	};

	const FileInput = defaultImageRenderType === "block" ? Upload.Dragger : Upload;

	const Custom = useMemo(
		() =>
			CustomImageRender
			,
		[fileList]
	);



	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
			>
				{Custom &&
					images.map((image, targetIndex) => (
						<Custom
							key={targetIndex}
							image={image}
							handleDelete={() => {
								setFileList(
									fileList.filter(
										(_, index) => targetIndex !== index
									)
								);
								setImages(
									images.filter(
										(_, index) => targetIndex !== index
									)
								);
							}}
						/>
					))}
			</motion.div>

			<ImgCrop rotationSlider showGrid aspect={aspectRatio}>
				<FileInput
					className={
						images.length >= maxUploads
							? "invisible-upload-image"
							: className
					}
					accept={acceptedFileTypes}
					multiple={multipleUploads}
					maxCount={maxUploads}
					listType={defaultImageRenderTypes[defaultImageRenderType]}
					fileList={fileList.map((file) => {
						if (!uploadUrl) {
							file.status = "done";
						}
						return file;
					})}
					onChange={onChange}
					action={uploadUrl}
					onPreview={onPreview}
					itemRender={(image) => (CustomImageRender ? [] : image)}
					showUploadList={{
						showPreviewIcon: preview,
						showRemoveIcon: true,
					}}
				>
					{message}
				</FileInput>
			</ImgCrop>

			{previewImage && (
				<Image
					wrapperStyle={{ display: "none" }}
					preview={{
						visible: !!previewImage,
						onVisibleChange: (visible) =>
							!visible && setPreviewImage(undefined),
						afterOpenChange: (visible) =>
							!visible && setPreviewImage(undefined),
					}}
					src={URL.createObjectURL(previewImage)}
				/>
			)}
		</AnimatePresence>
	);
};

export default ImageUpload;
