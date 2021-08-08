import React  from 'react';
import { Link } from 'react-router-dom';
import { List, Divider, Button, Space, Collapse, Timeline, Card } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import * as moment from 'moment';


const { Panel } = Collapse;

const CheckinList = ({ checkin }) => {
  let data = [];
  if (!checkin.length) {
    return <h3> You havent checked in anywhere yet...</h3>;
  }

  if( checkin) {
        checkin.map((entry) => {
            const {restaurantName, restaurantId, maxPoint, offerOne, offerTwo, activeTemplate, visitDate}  = entry;
            const formattedDate = moment.unix(visitDate/1000).format("DD/MM/YYYY")

            const entryExists = data.some(oldEntry => oldEntry.restaurantId === restaurantId);
            if(entryExists) {
                data.map((oldEntry) => {
                    if(oldEntry.restaurantId == restaurantId ){
                        oldEntry.visitDate.push(formattedDate);
                    }
                })
            } else {
                data.push({'restaurantName' : restaurantName, 'restaurantId' : restaurantId, 'maxPoint' : maxPoint , 'offerOne': offerOne, 'offerTwo': offerTwo, 
                                'activeTemplate': activeTemplate, 'visitDate': [formattedDate]  });
            }
        });
   }
  

  return (
    <>
    <Divider orientation="left">Checkin History</Divider>
    <List
       style={{width:"100%"}}
      size="large"
      header={<div></div>}
      footer={<div></div>}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 20,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item
        key={item.restaurantId}
        style={{width:"100%"}}
        > 
            <Collapse  style={{width:"100%"}}>

            <Panel header={item.restaurantName} key={item.restaurantId} >
                <Card style={{backgroundColor:"#fce1e0", fontWeight: 300}}>
                    {item.activeTemplate == "1" || item.activeTemplate == "2"? (
                        <Timeline>
                        
                        {Array.from({ length: 3 }, (_, i) =>  item.visitDate[i] ?  <Timeline.Item color="blue">{item.visitDate[i]}</Timeline.Item>  :  <Timeline.Item color="gray">See you soon</Timeline.Item> )}
                        {item.visitDate[3] ?  (<Timeline.Item  color="blue">{item.visitDate[3]}</Timeline.Item>) :  (<Timeline.Item dot={<StarOutlined style={{ fontSize: '30px' }} />} color="gray">{item.offerOne}</Timeline.Item>)}

                        {Array.from({ length: 3 }, (_, i) =>  item.visitDate[i+4] ?  <Timeline.Item color="blue">{item.visitDate[i]}</Timeline.Item>  :  <Timeline.Item color="gray">See you soon</Timeline.Item> )}
                        {item.visitDate[8] ?  (<Timeline.Item  color="blue">{item.visitDate[8]}</Timeline.Item>) :  (<Timeline.Item dot={<StarOutlined style={{ fontSize: '30px' }} />} color="gray">{item.offerTwo}</Timeline.Item>)}

                        </Timeline>
                    ) : null}
                 </Card>   
                </Panel>

            </Collapse>      
      </List.Item>
      )}
    />
    
  </>
  );
};

export default CheckinList;
