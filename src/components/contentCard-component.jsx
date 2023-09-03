import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/css/contentCard-component.css";

const ContentCard = ({ dataContent }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const truncatedTitle =
    dataContent.title.length > 25
      ? dataContent.title.substring(0, 25) + "..."
      : dataContent.title;

  const truncatedDescription =
    dataContent.description.length > 30
      ? dataContent.description.substring(0, 30) + "..."
      : dataContent.description;

  return (
    <>
      <div
        className="news-card"
        style={{ backgroundColor: "white" }}
        onClick={openModal}
      >
        <img src={dataContent.url_img} alt={dataContent.title} />
        <h3>{truncatedTitle}</h3>
        <p>{truncatedDescription}</p>
        <a
          href={dataContent.url_source}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Content Details"
        className="modalcss"
      >
        {/* <img src={dataContent.url_img} alt={dataContent.title} /> */}
        <div className="ratio ratio-16x9">
          <iframe
            width="560"
            height="315"
            src={dataContent.url_video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h2>{dataContent.title}</h2>
        <p>Sumber: {dataContent.source}</p>
        <p>{dataContent.description}</p>
        <a
          href={dataContent.url_source}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
        {/* <button onClick={closeModal}>Close</button> */}
      </Modal>
    </>
  );
};

export default ContentCard;
