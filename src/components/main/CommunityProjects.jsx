import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./CommunityProjects.css";


const ProjectCard = ({ project }) => {
  return (
    
    <div className="col-md-4 mb-4">
      <div className="card project-card">
        <img src={project.image} className="card-img-top" alt={project.name} />
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <p className="card-text">{project.description}</p>
        </div>
        <div className="contributors-section " >
          {project.contributors.map((contributor) => (
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" key={contributor.id}>
              <img src={contributor.avatar_url}   className='contributors-wrapper' alt={contributor.login} title={contributor.login} />
            </a>
          ))}
        </div>
      </div>
    </div>
 
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};


const CommunityProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const reposResponse = await axios.get('https://api.github.com/orgs/cetmca26/repos');
        const repos = Array.isArray(reposResponse.data) ? reposResponse.data : [];

        const projectsWithContributors = await Promise.all(
          repos.map(async (repo) => {
            const contributorsResponse = await axios.get(repo.contributors_url);
            return {
              name: repo.name,
              description: repo.description,
              image: 'https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg', // Replace with dynamic image if available
              contributors:  Array.isArray(contributorsResponse.data)?contributorsResponse.data : [],
            };
          })
        );

        setProjects(projectsWithContributors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
   
   
    <div className="container" style={{marginTop:'80px'}} >
      <h1 className="text-center mb-4 mt-4 mb-2 p-4" >Community Projects</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row ">
          {projects.map((project, index) => (
            <ProjectCard  key={index} project={project} />
          ))}
        </div>
      )}
    </div>
   
    
  );
};

export default CommunityProjects;
