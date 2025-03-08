import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchResult from "./Components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("unable to fetch data");
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton(type);
      return;
    } else {
      const filter = data?.filter((food) => food.type === type);
      setFilteredData(filter);
      setSelectedButton(type);
    }
  };

  const filteredButton = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filteredButton.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              key={value.name}
              onClick={() => filteredFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border-radius: 5px;
      color: white;
      border: 1px solid #ff0909;
      padding: 10px;
      width: 285px;
      height: 40px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 40px;
`;
export const Button = styled.button`
  background-color: ${(props) => (props.isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${(props) => (props.isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  color: white;
  width: 74px;
  height: 31px;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
