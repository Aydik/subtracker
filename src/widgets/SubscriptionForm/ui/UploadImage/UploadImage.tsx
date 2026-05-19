import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import type { GetProp, UploadFile, UploadProps } from 'antd';
import type { FC } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface UploadImageProps {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}

export const UploadImage: FC<UploadImageProps> = ({ fileList, setFileList }) => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="#"
        customRequest={({ onSuccess }) => {
          onSuccess?.('ok');
        }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
        multiple={false}
      >
        {fileList.length === 0 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};
