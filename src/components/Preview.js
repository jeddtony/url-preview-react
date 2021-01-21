import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviewComponent from 'units/PreviewComponent';
import "regenerator-runtime/runtime";

export default function Preview ({ input }) {
    // stores the data fetched
    const [dataFetched, setFetchData] = useState([]);
    // stores the url
    const [fetchedUrls, setFetchedUrls] = useState([]);
    const [urlsToDisplay, setUrlsToDisplay] = useState([]);
    const [, setState] = useState({});
  
    if (!input) {
      input = "";
    }
    useEffect(() => {
      let explodeString = input.split(" ");
      let allUrls = [];
      let urlData = [];
  
      explodeString.map((explodString) => {
        let containsFullStop = explodString.indexOf(".");
  
        if (containsFullStop > 0 && explodString.length - containsFullStop > 3) {
          allUrls.push(explodString);
        }
      });
  
      if (allUrls.length > 0) {
        setUrlsToDisplay(allUrls);
  
        console.log("showing the new set ", allUrls);
        let tempFetchData = [];
  
        let unionUrls = dataFetched.map(dat => {
          if (allUrls.includes(dat.url)){
              return dat.url
          }
        });
  
        let unionData = dataFetched.map(dat => {
          console.log('showing the dat ', dat );
          if (allUrls.includes(dat.url)){
          
              return dat
          }
        });
  
  
        allUrls = allUrls.concat(unionUrls);
        allUrls = new Set(allUrls);
        // start looping
        
       allUrls.forEach(async (url) => {
          // Checks if url has been fetched before
          if (fetchedUrls.includes(url)) {
            return;
          }
  
          if(url === undefined){
            return;
          }
  
          let fetchData = await axios.get(
            `http://localhost:4001?q=${url}`
            // `http://api.url-previewer.com?q=${url}`
          );
  
          let status = fetchData.status;
  
          if (status === 200) {
            let tempFetchedUrls = fetchedUrls;
            tempFetchedUrls.push(url);
            setFetchedUrls(tempFetchedUrls);
            let data = fetchData.data;
            tempFetchData = dataFetched;
            // tempFetchData = unionData;
            tempFetchData.push({ ...data });
            // console.log('showing the temp fetch data ', tempFetchData);
            // return data;
  
            // filter out removed urls 
            // let finalData = allUrls.filter(temp => !fetchedUrls.includes(temp.url));
            setFetchData(tempFetchData);
          }
          setState({});
        });
  
      }
      return () => [dataFetched, fetchedUrls];
    }, [input]);
  
    return <PreviewComponent dataFetched={dataFetched} urlsToDisplay={urlsToDisplay}/>;
  }
  
 