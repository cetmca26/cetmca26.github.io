import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./CommunityProjects.css";


const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card project-card" onClick={() => onClick(project)} style={{ cursor: 'pointer' }}>
        <img src={project.image} className="card-img-top" alt={project.name} />
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <p className="card-text" style={{ maxHeight: '100px', overflow: 'hidden' }}>
            {project.description || "No description available."}
          </p>
        </div>
        <div className="contributors-section m-0 p-3 d-flex justify-content-center ">
  <button className="btn btn-info btn-sm">
    Click To View More
  </button>
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
    html_url: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};


const CommunityProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

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
              image: 'https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg',
              contributors: Array.isArray(contributorsResponse.data) ? contributorsResponse.data : [],
              html_url: repo.html_url
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
    <div className="container" style={{ marginTop: '80px' }}>
      <h1 className="text-center mb-4 mt-4 mb-2 p-4">Community Projects</h1>
   
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onClick={setSelectedProject} />
          ))}
        </div>
      )}

      {/* Modal to show full project details */}
      {selectedProject && (
        <Modal show={true} onHide={() => setSelectedProject(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProject.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProject.image} className="img-fluid mb-3" alt={selectedProject.name} />
            <p><strong>Description:</strong></p>
            <p>{selectedProject.description || "No description available."}</p>
            <p><strong>Contributors:</strong></p>
            <div className="contributors-section">
              {selectedProject.contributors.map((contributor) => (
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={contributor.id}
                  className="me-2"
                >
                  <img
                    src={contributor.avatar_url}
                    className='contributors-wrapper'
                    alt={contributor.login}
                    title={contributor.login}
                  />
                </a>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Project on GitHub
            </a>
            <Button variant="secondary" onClick={() => setSelectedProject(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CommunityProjects;
