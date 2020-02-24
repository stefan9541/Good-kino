import io from "socket.io-client";
import { connect } from "react-redux";
import { message } from "antd";

const socket = io.connect("http://localhost:8080");

const RealTimeNotification = ({ subscribers }) => {
  const subscribeToNotification = () => {
    if (subscribers.length) {
      subscribers.forEach(item => {
        socket.on(item, str => {
          message.success("BRATISHKA TUT NOVA9 SERIA VISHLA");
        });
      });
    }
  };
  subscribeToNotification();
  return null;
};

const mapStateToProps = state => {
  return {
    subscribers: state.userReducer.favoriteMovies
  };
};

export default connect(mapStateToProps)(RealTimeNotification);
