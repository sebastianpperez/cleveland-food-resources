import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders main application elements after loading', async () => {
  render(<App />);
  
  // Wait for loading to complete and main content to appear
  await waitFor(() => {
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toHaveTextContent('Cleveland Food Resources');
  }, { timeout: 3000 });
  
  // Check for Greater Cleveland Food Bank Network text
  expect(screen.getByText('Greater Cleveland Food Bank Network')).toBeInTheDocument();
});

test('renders search functionality after loading', async () => {
  render(<App />);
  
  // Wait for search input to appear
  await waitFor(() => {
    const searchInput = screen.getByPlaceholderText(/Search food resources/i);
    expect(searchInput).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('renders admin button after loading', async () => {
  render(<App />);
  
  // Wait for admin button to appear
  await waitFor(() => {
    const adminButton = screen.getByText(/Admin/i);
    expect(adminButton).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('shows loading state initially', () => {
  render(<App />);
  
  // Check that loading state is shown initially
  expect(screen.getByText(/Loading Cleveland Food Resources/i)).toBeInTheDocument();
});
