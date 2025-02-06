import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
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
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';

// Sample course data with image URLs for demonstration.
const sampleCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    description:
      'Kickstart your journey with React, covering fundamental concepts and hands-on examples that empower you to build dynamic web applications.',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8anN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description:
      'Dive deep into advanced JavaScript topics including closures, prototypes, and asynchronous programming to master the language.',
    category: 'Programming',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGpzfGVufDB8fDB8fHww',
  },
  {
    id: 3,
    title: 'UI/UX Design Essentials',
    description:
      'Learn the principles of UI/UX design and create engaging, user-friendly interfaces with practical examples and design tips.',
    category: 'Design',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3R8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    title: 'Data Science Bootcamp',
    description:
      'Embark on a data-driven journey covering machine learning, data visualization, and statistical analysis with real-world projects.',
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWN0fGVufDB8fDB8fHww',
  },
  {
    id: 5,
    title: 'Full-Stack Development',
    description:
      'Master both frontend and backend development with a comprehensive course covering modern frameworks and best practices.',
    category: 'Web Development',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1687509673996-0b9e35d58168?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViZGV2fGVufDB8fDB8fHww',
  },
];

const CoursePage = () => {
  // Theme and responsive breakpoints.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State variables for search, sorting, filtering, favorites, and modal.
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Memoized filtering and sorting of courses.
  const filteredCourses = useMemo(() => {
    let courses = sampleCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== 'All') {
      courses = courses.filter((course) => course.category === categoryFilter);
    }

    courses.sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    return courses;
  }, [searchTerm, sortOrder, categoryFilter]);

  // Toggle favorite status.
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Get sorted categories.
  const categories = useMemo(
    () => ['All', ...new Set(sampleCourses.map((course) => course.category))].sort(),
    []
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'primary.main', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🎓 Course Catalog
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: isMobile ? 2 : 3, maxWidth: 1600, margin: '0 auto' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="filled"
              label="Search courses..."
              InputProps={{
                sx: { borderRadius: 2, bgcolor: 'background.paper' },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="asc">A-Z</MenuItem>
                <MenuItem value="desc">Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {filteredCourses.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              p: 8,
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: 1,
            }}
          >
            <InfoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No courses found matching your criteria
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={isMobile ? 2 : 4}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} lg={4} key={course.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 320,
                      objectFit: 'cover',
                      borderBottom: '4px solid',
                      borderColor: 'primary.main',
                    }}
                    image={course.imageUrl}
                    alt={course.title}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {course.title}
                      <Tooltip title={`${favorites.includes(course.id) ? 'Remove from' : 'Add to'} favorites`}>
                        <IconButton
                          onClick={() => toggleFavorite(course.id)}
                          aria-label={favorites.includes(course.id) ? 'Remove favorite' : 'Add favorite'}
                          sx={{
                            color: favorites.includes(course.id) ? 'error.main' : 'inherit',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.2)' },
                          }}
                        >
                          {favorites.includes(course.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      </Tooltip>
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto',
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setSelectedCourse(course)}
                        startIcon={<InfoIcon />}
                        sx={{ borderRadius: 2 }}
                      >
                        Details
                      </Button>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          bgcolor: 'action.selected',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: 500,
                        }}
                      >
                        {course.category}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Details Dialog */}
      <Dialog
        open={Boolean(selectedCourse)}
        onClose={() => setSelectedCourse(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selectedCourse && (
          <>
            <DialogTitle
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
              }}
            >
              {selectedCourse.title}
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
              <CardMedia
                component="img"
                image={selectedCourse.imageUrl}
                alt={selectedCourse.title}
                sx={{
                  height: 300,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 3,
                }}
              />

              <DialogContentText>{selectedCourse.description}</DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedCourse(null)} variant="contained" sx={{ borderRadius: 2 }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CoursePage;
