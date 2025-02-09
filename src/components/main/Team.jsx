import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const members = [
  { name: 'Deepak K H', image: 'https://avatars.githubusercontent.com/u/184137882?v=4', socials: {  linkedin: '#' } },
  { name: 'Bhavana T..', image: 'https://avatars.githubusercontent.com/u/99276236?v=4', socials: {  linkedin: '#' } },
  { name: 'Aswin R', image: 'https://avatars.githubusercontent.com/u/176476526?v=4', socials: {  linkedin: '#' } },
  { name: 'Shivarama', image: 'https://avatars.githubusercontent.com/u/145856726?v=4', socials: {  linkedin: '#' } },
  { name: 'Yadhu', image: 'https://www.yadhukrishnx.works/assets/images/yadhu.svg', socials: {  linkedin: '#' } },
];

const MemberCard = ({ member }) => (
  <motion.div 
    className="col-md-2 col-sm-4 mb-4"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow rounded-3">
      <Card.Img variant="top" src={member.image} className="rounded-top" />
      <Card.Body className="text-center">
        <Card.Title>{member.name}</Card.Title>
        <div>
          
          <Button variant="outline-info" size="sm" href={member.socials.linkedin} className="m-1">LinkedIn</Button>
        </div>
      </Card.Body>
    </Card>
  </motion.div>
);

const Team = () => (
    <div className="section full-height m-1">
    <div className="absolute-center" style={{marginTop:'-10px'}}>
    <div className="container my-4 "  ></div>
  <div className="container py-4">
    <h2 className="text-center mb-4">Community Members</h2>
    <div className="row justify-content-center mt-3">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  </div>
  </div>
  </div>
);

export default Team;
