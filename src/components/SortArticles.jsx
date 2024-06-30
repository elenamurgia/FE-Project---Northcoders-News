import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";

function SortArticles() {
  const [isHidden, setIsHidden] = useState(true);
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
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        {isHidden ? "Show filters" : "Hide filters"}
      </Button>

      <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

      <Dropdown.Menu>
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
