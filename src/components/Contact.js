import React from "react";
import {FaRegStar, FaStar , FaCheck, FaCheckDouble} from "react-icons/fa";

import {MdDelete, MdEdit} from "react-icons/md";

import firebase from "firebase/app"
import {contactContext} from "../context/Context"
import {CONTACT_TO_UPDATE, SET_SINGLE_CONTACT} from "../context/Actiontype"


import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import { useContext } from "react";
import {Col, Row} from "reactstrap"
  


const Contact = ({contact, contactKey})=>{
    const {dispatch} = useContext(contactContext);
    const history = useHistory()

    const deleteContact = ()=>{
       firebase.database().ref(`Contacts/${contactKey}`).remove()
       .then(()=>{
           toast("DELETED SUCCESSFULLY", {type:"warning"})
       })
       .catch(err=> console.log(err))
    }


    //ADDING A STAR
    const updateImpContact = ()=>{
        firebase.database().ref(`Contacts/${contactKey}`)
        .update(
            {
                star:!contact.star
            }, error=>{console.log(error)}
        )
        .then(()=>{
            toast("Contact Updates",{type:"info"} )
        })
        .catch(err=>console.log(err))
    }

//ADDING CHECK Sign
  const checked = ()=>{
    firebase.database().ref(`Contacts/${contactKey}`)
    .update(
      {
     check:contact.check
      }
    )
    .then(()=>{
      toast("Contact Updates",{type:"info"} )
  })
  }

    const updateContact = ()=>{
      dispatch({
          type:CONTACT_TO_UPDATE,
          payload:contact,
          key:contactKey
      })

      history.push("/contact/add")
    }



    const viewSingleContact = ()=>{
        dispatch({
            type:SET_SINGLE_CONTACT,
            payload:contact
        })
        history.push("/contact/view");
    }
    return (
        <>
          <Row>
            <Col
              md="1"
              className="d-flex justify-content-center align-items-center"
            >
              <div className="icon" onClick={() => updateImpContact()}>
                {contact.star ? (
                  <FaStar className=" text-primary" />
                ) : (
                  <FaRegStar className=" text-info" />
                )}
              </div>
            </Col>
            <Col
              md="2"
              className="d-flex justify-content-center align-items-center"
            >
              <img src={contact.picture} alt="" className="img-circle profile" />
            </Col>
            <Col md="8" onClick={() => viewSingleContact(contact)}>
              <div className="text-primary">{contact.name}</div>
    
              <div className="text-secondary">{contact.phoneNumber}</div>
              <div className="text-secondary">
                {contact.email}
              </div>
    
              <div className="text-info">{contact.address}</div>
            </Col>
            <Col
              md="1"
              className="d-flex justify-content-center align-items-center"
            >
              <MdDelete
                onClick={() => deleteContact()}
                color="danger"
                className="text-danger icon"
              />
              <MdEdit
                className="icon text-info ml-2"
                onClick={() => updateContact()}
              />
               
            </Col>
          </Row>
        </>
      );
}
export default Contact;
