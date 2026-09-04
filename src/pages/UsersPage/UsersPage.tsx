import { useMemo, useState } from "react";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import Title from "../../components/Title/Title";
import UsersTable from "../../components/UsersTable/UsersTable";
import { users } from "../../mockData/users";
import CustomButton from "../../components/CustomButton/CustomButton";

type FiltersForUsers = "all" | "active" | "blocked";
type SortNames = "asc" | "desc";

const UsersPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<FiltersForUsers>("all");
  const [sortNames, setSortNames] = useState<SortNames>("asc");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const sortedUsers = useMemo(() => {
    return users
      .filter((user) => filter === "all" || user.status === filter)
      .filter(
        (user) =>
          user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .toSorted((a, b) =>
        sortNames === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
  }, [searchValue, filter, sortNames]);

  return (
    <div>
      <Title className="mb-5">Users</Title>
      <div className="mb-3 flex">
        <div className="mr-5">
          <p className="text-xl font-bold mb-3">Search</p>
          <CustomSearch
            placeholder="Search..."
            className="mb-2.5 w-65"
            onChange={onSearch}
          />
        </div>

        <div className="mr-5">
          <p className="text-xl font-bold mb-3">Filters</p>
          <div className="flex">
            <CustomButton onClick={() => setFilter("all")} className="mr-2.5">
              All
            </CustomButton>
            <CustomButton
              onClick={() => setFilter("active")}
              className="mr-2.5"
            >
              Active
            </CustomButton>
            <CustomButton onClick={() => setFilter("blocked")} className="">
              Blocked
            </CustomButton>
          </div>
        </div>

        <div className="mr-5">
          <p className="text-xl font-bold mb-3">Sort</p>
          <div className="flex">
            <CustomButton
              onClick={() => setSortNames("asc")}
              className="mr-2.5"
            >
              А - Я
            </CustomButton>
            <CustomButton
              onClick={() => setSortNames("desc")}
              className="mr-2.5"
            >
              Я - А
            </CustomButton>
          </div>
        </div>
      </div>
      <UsersTable users={sortedUsers} />
    </div>
  );
};
export default UsersPage;
