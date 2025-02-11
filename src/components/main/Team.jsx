import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Team.css';

const GITHUB_API = 'https://api.github.com/repos/cetmca26/MCA-Laboratory/contributors';

const MemberCard = ({ member }) => (
  <motion.div
    className="col-md-3 col-sm-6 mb-3"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-sm rounded-3 text-center small-card">
      <Card.Img variant="top" src={member.avatar_url} className="rounded-circle mx-auto mt-3" style={{ width: '80px', height: '80px' }} alt={member.login} />
      <Card.Body>
        <Card.Title className="h6">{member.login}</Card.Title>
        <Card.Text className=" small card-text">Contributions: {member.contributions}</Card.Text>
        <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-sm">
          GitHub Profile
        </a>
      </Card.Body>
    </Card>
  </motion.div>
);

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GITHUB_API)
      .then(response => response.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching contributors:', error));
  }, []);

  return (
    <section className="bg-light py-5 container"  style={{marginTop:'80px'}}>
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={7} className="text-center">
            <h6 className="text-primary text-uppercase">Our Contributors</h6>
            <h2>Meet the Team</h2>
            <p className="text-muted">These individuals contributed to the MCA Laboratory repository with dedication and excellence.</p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Team;
