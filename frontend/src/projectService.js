// projectService.js
const API_BASE_URL = 'http://localhost:8080/api/projects';
const username = 'admin';
const password = 'admin';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export async function fetchProjectsByUser(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      'Authorization': basicAuth
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function createProject(project) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': basicAuth
    },
    body: JSON.stringify(project)
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
}

export async function deleteProject(projectId) {
  const response = await fetch(`${API_BASE_URL}/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': basicAuth
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
}
