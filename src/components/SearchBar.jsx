import { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { routes } from "../utils/constants";

function SearchBar({ closeMenu }) {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchText === "") {
      return;
    }

    history.push(
      `${routes.courses}?searchQuery=${encodeURIComponent(searchText)}`
    );

    closeMenu();
  };

  useEffect(() => {
    // reset searchText on diff route
    if (location.pathname !== routes.courses) {
      setSearchText("");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("searchQuery") || "";
    setSearchText(decodeURIComponent(query));
  }, [location]);

  return (
    <Form
      className="d-flex align-items-center my-4 mx-4 justify-content-center"
      onSubmit={handleSearch}
      onClick={(e) => e.stopPropagation()}
    >
      <InputGroup className="search-box mobile-search">
        <FormControl
          type="text"
          placeholder="Search for courses"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />

        <Button type="submit" variant="outline-secondary">
          <i class="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
