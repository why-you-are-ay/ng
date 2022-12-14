import React, {useState} from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {useNavigate}from 'react-router-dom'
import Search from "./search";
import "./tableCss.css"
import styled from "styled-components";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from '../../../common/api/http-common';
import { nftContract } from "../../../common/web3/web3Config"

const AdminTd = styled.td`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right:50px;
  border: 1px solid black;
  text-align: center;
  `

const AdminTh = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right:50px;
  border: 1px solid black;
  text-align: center;
  background-color: gray;
  `

const AdminTable = styled.table` 
  border-collapse: collapse;
  `

function Table({ columns, data }) {
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [comName, setComName] = useState('');
  const [comEmail, setComEmail] = useState('');
  const [comTel, setComTel] = useState('');
  const [comRegNum, setComRegNum] = useState('');
  const [comWallet, setComWallet] = useState('');
  const [comAddress, setComAddress] = useState('');

  const handleClose = () => {
    setComName('');
    setComEmail('');
    setComTel('');
    setComRegNum('');
    setComWallet('');
    setComAddress('');
    setShow(false);};

  const handleShow = (idx) => {
    axios.get(`/company/${idx}`)
    .then((res) => {
      setComName(res.data.comName);
      setComEmail(res.data.comEmail);
      setComTel(res.data.comTel);
      setComRegNum(res.data.comRegNum);
      setComWallet(res.data.comWallet);
      setComAddress(res.data.comAddress);
      setShow(true);
      })
  };
  
  const approval = () => {
    nftContract.methods.setBrandAccountAuth(comWallet).send({from: window.localStorage.wallet})
    .then(() => {
      const body = {"comPermit": 2};
      axios.post(`/company/permit/${comWallet}`, body).then(() => {
        setShow(false);
        history('/admin/approve');
      })
      })
    .catch((err) => {
      console.log(err)
      alert('????????? ????????? ????????????.')});
  }
  
  const deny = () => {
    const body = {"comPermit": 3};
    axios.post(`/company/permit/${comWallet}`, body).then(() => {
      setShow(false);
      history('/admin/deny');
    })
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>?????? ?????? ??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>??????: {comName}</p>
          <p>?????????: {comEmail}</p>
          <p>????????????: {comTel}</p>
          <p>??????: {comAddress}</p>
          <p>????????? ????????????: {comRegNum}</p>
          <p>?????? ??????: {comWallet}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={approval}>
            ??????
          </Button>
          <Button variant="danger" onClick={deny}>
            ??????
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            ??????
          </Button>
        </Modal.Footer>
      </Modal>
      <Search onSubmit={setGlobalFilter}/>
      <AdminTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <AdminTh {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </AdminTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => handleShow(row.original.comWallet)}>
                {row.cells.map((cell) => (
                  <AdminTd {...cell.getCellProps()}>{cell.render("Cell")}</AdminTd>
                ))}
              </tr>
            );
          })}
        </tbody>
      </AdminTable>
    </>
  );
}

export default Table;