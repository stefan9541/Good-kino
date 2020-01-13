import React from "react";
import { Icon, Upload, message, Avatar, Button, Col } from "antd";
import { withGoodKinoService } from "../hoc";

import "./update-user-avatar.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      file: null,
      imageUrl: null
    };
  }

  beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      return message.error("You can only upload JPG/PNG file!");
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      return message.error("Image must smaller than 3MB!");
    }

    getBase64(file, imageUrl => {
      this.setState({
        file,
        imageUrl
      });
    });
    return false;
  };

  uploadImage = e => {
    e.preventDefault();
    const { updateUserAvatar } = this.props.goodKinoService;
    const { file } = this.state;
    const formData = new FormData();
    formData.append("avatar", file);
    updateUserAvatar(formData)
      .then(res => console.log(res))
      .catch(err => console.log({ ...err }));
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Col span={3}>
        <form onSubmit={this.uploadImage} encType="multipart/form-data">
          <h3>Change avatar</h3>
          <Upload
            name="avatar"
            accept=".jpeg, .png"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            {imageUrl ? (
              <Avatar src={imageUrl} size={64} alt="avatar" />
            ) : (
              uploadButton
            )}
          </Upload>
          <Button className="update-avatar-btn" htmlType="submit">
            Изменить
          </Button>
        </form>
      </Col>
    );
  }
}

export default withGoodKinoService()(UserAvatar);
