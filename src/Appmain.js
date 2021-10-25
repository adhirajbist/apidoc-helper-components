import React, {useEffect,useState} from 'react'
import ApidocSideNav from './components/ApidocSideNav'
import RightPanel from './components/RightPanel'
import { RedocStandalone } from 'redoc';
import data from './rcsapijson/Dotgo_RCS_APIs_updated.json'
import modifiedData from './rcsapijson/updated.json'

function App() {
    let sidenavdata = {};
    Object.keys(modifiedData.tags).forEach(tag =>{
        sidenavdata[tag] = modifiedData.tags[tag].leftPanel;
    });
    const rightpanData = modifiedData.tags["Send Messages"].summary["This is the API used to send messages and isTyping indications to users."];    
    //<ApidocSideNav data={sidenavdata} />
    //<RightPanel data={rightpanData} />
    //<RedocStandalone spec={data} />
    return(
        <>
            <RightPanel data={rightpanData} />
        </>
    );
}

export default App;