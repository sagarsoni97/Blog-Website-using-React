import React, {useState, useEffect} from 'react';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import {Variant} from './Variant'

export const CustomButton = ({title, onClick, variant}) => {
    return (
        <Button variant={variant} onClick={()=>onClick()}>{title}</Button>
    )
}
