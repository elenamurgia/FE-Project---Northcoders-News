import { useNavigate, createSearchParams } from "react-router-dom";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";

function SortArticles() {
  const navigate = useNavigate();

  const handleSortClick = (sortBy, order) => {
    navigate({
      search: createSearchParams({
        sort_by: sortBy,
        order: order,
      }).toString(),
    });
  };

  return (
    <Dropdown as={ButtonGroup} className="float-end">
      <Button
        variant="secondary"
        size="sm"
        style={{
          backgroundColor: "#012E40",
          color: "#F2F2F2",
          borderColor: "#012E40",
        }}
      >
        Show filters
      </Button>

      <Dropdown.Toggle
        split
        variant="secondary"
        style={{
          backgroundColor: "#012E40",
          color: "#F2F2F2",
          borderColor: "#012E40",
        }}
      />

      <Dropdown.Menu
        style={{
          backgroundColor: "#F2F2F2",
          color: "#012E40",
          borderColor: "#012E40",
        }}
      >
        <Dropdown.Item onClick={() => handleSortClick("created_at", "desc")}>
          Newest First
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortClick("created_at", "asc")}>
          Oldest First
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortClick("votes", "desc")}>
          Most Votes
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortClick("votes", "asc")}>
          Fewest Votes
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortArticles;
