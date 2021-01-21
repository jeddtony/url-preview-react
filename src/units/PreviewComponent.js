import React, {useEffect} from 'react';
// import styled from "@emotion/styled";
// import {flexContainer, imageItem, titleItem} from '../config/styles';

export default function PreviewComponent({ dataFetched, urlsToDisplay }) {
    useEffect(() => {
        return () => {};
      }, [dataFetched]);
      return (
        <>
          {dataFetched.map((fetchDat, index) => (
              <> {
                  urlsToDisplay.includes(fetchDat.url.substring(7)) && (
    <div className="flex-container" key={index} style={{backgroundColor: "#EDEDED", display: "flex", flexDirection: "row", flexWrap: "nowrap"}}>
              <div className="image-item" style={{flexGrow: 1}}>
                <img src={fetchDat.image} height="100px" />
              </div>
              <div className="title-item" style={{display: "flex", alignItems: "center", flexDirection: "column", flexGrow: 4}}>
                <p style={{ paddingLeft: "20px" }}>
                  <strong>{fetchDat.title}</strong>
    
                  <br />
                  <br />
                  <span>{fetchDat.description}</span>
                </p>
              </div>
            </div>
                  )
              }
            </>
          ))}
        </>
      );
    
}
