import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './form.css';

export const CrudExample = () => {
  const [userList, setUserList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (edit) {
      userList.splice(user.id - 1, 0, user);
      setUserList([...userList]);
      setUser({ ...user, id: userList.length + 1 });
      setEdit(false);
    } else {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }

      setUser({ ...user, id: user.id + 1 });
      setUserList([...userList, user]);
    }
  };
  const OnEditHandle = item => {
    setEdit(true);
    setUser({
      id: item.id,
      email: item.email,
      password: item.password
    });
    setUserList(userList.filter(ele => ele.id !== item.id));
  };
  const onDeleteHandle = id => {
    setUserList(userList.filter(item => item.id !== id));
    if (userList.length === 1) setUser({ ...user, id: 1 });
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={e =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={e =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      {userList.length > 0 && (
        <div className="expanded-container">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>id</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() => OnEditHandle(item)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteHandle(item.id)}
                    >
                      Delete
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};
