import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [sin, setSin] = useState('');
  const [period, setPeriod] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    if (sin && period) {
      history.push(`/${period}/${sin}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(90vh - 64px)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 5, width: 500 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ p: 5 }}>
            Student Attendance
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextField
              label="Student Identification Number (SIN)"
              variant="outlined"
              value={sin}
              onChange={(e) => setSin(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Period</InputLabel>
              <Select
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={!sin || !period}
                sx={{ mt: 4, p: 2, borderRadius: 2, width: 200 }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SearchPage;
