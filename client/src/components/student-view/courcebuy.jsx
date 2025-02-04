import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CardActions,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SortIcon from '@mui/icons-material/Sort';



// Sample data for demonstration purposes.
const sampleSources = [
  { id: 1, title: 'Source One', description: 'This is the description for source one. It provides insightful details and interesting facts.', category: 'News' },
  { id: 2, title: 'Source Two', description: 'This is the description for source two. It features engaging articles and blog posts.', category: 'Blog' },
  { id: 3, title: 'Another Source', description: 'This is the description for another source. It offers tutorials and guides for various topics.', category: 'Tutorial' },
  { id: 4, title: 'Amazing Source', description: 'This is the description for an amazing source. It covers a wide range of current events and news.', category: 'News' },
  { id: 5, title: 'React Source', description: 'Learn React with this amazing source. It provides coding tips, best practices, and real-world examples.', category: 'Tutorial' },
];

const SourcePage = () => {
  // State for search input, sorting, and filtering.
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // State for favorite sources (using the source id).
  const [favorites, setFavorites] = useState([]);
  // State to control the details modal.
  const [selectedSource, setSelectedSource] = useState(null);

  // Filter, sort, and optionally filter by category using useMemo for performance.
  const filteredSources = useMemo(() => {
    let sources = sampleSources.filter(source =>
      source.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== 'All') {
      sources = sources.filter(source => source.category === categoryFilter);
    }

    sources.sort((a, b) => {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    return sources;
  }, [searchTerm, sortOrder, categoryFilter]);

  // Toggle favorite status.
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <Box>
      {/* App Bar for a polished header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Awesome Sources
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Search, Sort, and Category Filters */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              label="Search Sources"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="sort-label">
                <SortIcon sx={{ mr: 1 }} />
                Sort By
              </InputLabel>
              <Select
                labelId="sort-label"
                label="Sort By"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="asc">Title (A–Z)</MenuItem>
                <MenuItem value="desc">Title (Z–A)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {Array.from(new Set(sampleSources.map(source => source.category))).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Display the filtered sources */}
        <Grid container spacing={3}>
          {filteredSources.map((source) => (
            <Grid item xs={12} sm={6} md={4} key={source.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, cursor: 'pointer' }}
                  onClick={() => setSelectedSource(source)}
                >
                  <Typography variant="h5" gutterBottom>
                    {source.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {source.description.substring(0, 100)}
                    {source.description.length > 100 ? '...' : ''}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Category: {source.category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title={favorites.includes(source.id) ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton onClick={() => toggleFavorite(source.id)}>
                      {favorites.includes(source.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Button size="small" onClick={() => setSelectedSource(source)}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal for detailed view */}
      <Dialog
        open={Boolean(selectedSource)}
        onClose={() => setSelectedSource(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{selectedSource?.title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{selectedSource?.description}</DialogContentText>
          <Typography variant="caption" display="block" sx={{ mt: 2 }}>
            Category: {selectedSource?.category}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedSource(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SourcePage;
