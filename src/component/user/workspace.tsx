import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {}

const Workspace = (props: Props) => {
  const [projects, setProjects] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    project: '',
    floor: '',
    workspace: '',
  });

  // Fetch projects from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/v1/workspaceProjects/');
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Handle form field changes
  const handleChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as string;
    setFormData({
      ...formData,
      [name]: event.target.value as string,
    });
  };

  return (
    <div className="parkingbook">
      <h3>Book A Workspace</h3>
      <form className="">
        <FormControl fullWidth margin="normal">
          <InputLabel id="project-select-label">Project</InputLabel>
          <Select
            labelId="project-select-label"
            name="project"
            value={formData.project}
            onChange={handleChange}
            label="Project"
            required
          >
            {Object.entries(projects).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="floor-select-label">Floor</InputLabel>
          <Select
            labelId="floor-select-label"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            label="Floor"
            required
          >
            <MenuItem value="floor1">Floor-1</MenuItem>
            <MenuItem value="floor2">Floor-2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="workspace-select-label">Workspace</InputLabel>
          <Select
            labelId="workspace-select-label"
            name="workspace"
            value={formData.workspace}
            onChange={handleChange}
            label="Workspace"
            required
          >
            <MenuItem value="P1">Workspace-1</MenuItem>
            <MenuItem value="P23">Workspace-23</MenuItem>
            <MenuItem value="P238">Workspace-238</MenuItem>
            <MenuItem value="P123">Workspace-123</MenuItem>
            <MenuItem value="P323">Workspace-323</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#016375', borderRadius: '15px' }}
        >
          BookSlot
        </Button>
      </form>
    </div>
  );
};

export default Workspace;
