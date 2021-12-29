import { Button, Modal } from "antd";
import React from 'react'

class AppWorks extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({ visible: false });
  };

  render() {
    return (
      <div id="works" className="block worksBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>How it works?</h2>
            <p>
              Obcaecati consequatur libero repudiandae, aperiam itaque laborum!
            </p>
          </div>

          <div className="contentHolder">
            <Button onClick={this.showModal}>
              <i className="fas fa-play" />
            </Button>
          </div>

          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <iframe
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/bmN8wL-b-I4?controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AppWorks;
