import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ContentCard, LoadingComponent, NavbarComponent } from "../components";
import axios from "../configs/axios";
import { setContents, setLoading } from "../stores/reducers";

const ContentPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const GetContents = async (category, access_token) => {
    try {
      const result = await axios({
        method: "GET",
        url: `/content/membership?category=${category}`,
        headers: {
          access_token,
        },
      });
      dispatch(setContents(result.data.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const { category, contents, loading, access_token, user } = useSelector(
    (state) => state
  );

  if (!access_token) {
    history.push("/login");
  }

  useEffect(() => {
    GetContents(category, access_token);
  }, [dispatch, category, access_token, user]);

  if (loading) {
    return <LoadingComponent />;
  }

  const chunkedContents = chunkArray(contents, 3);

  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  return (
    <>
      <NavbarComponent />
      <div
        className="bgLogin d-flex justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="news-container mb-5">
            {chunkedContents.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((data) => (
                  <ContentCard key={data.id} dataContent={data} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPage;
