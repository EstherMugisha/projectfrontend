import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import React, {useRef, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const OrderUpdateForm = (props) => {
    const [orderStatus, setOrderStatus] = useState();
    const statusForm = useRef();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function handleSubmit() {
        const form = statusForm.current
        const data = {
            orderStatus: form['status'].value
        };
        axios.post('/orders/' + props.id + '/status', data, {headers})
            .then(function (response) {
                toast.success('Order status changed successfully');
                props.handleSubmit();
            }).catch(error => {
            toast(error.message);
        })
    }

    return (
        <Modal
            show={props.isOpen}
            onHide={props.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Order Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={statusForm}>
                    <Form.Group>
                        <Form.Label>Status: </Form.Label>
                        <select label={'status'} name={'status'} className="form-control">
                            <option value="0">Placed</option>
                            <option value="1">Shipping</option>
                            <option value="2">On the way</option>
                            <option value="3">Delivered</option>
                            <option value="4">Cancel</option>
                        </select>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={() => handleSubmit(orderStatus)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderUpdateForm;