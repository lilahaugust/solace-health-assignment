"use client";

import React, { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import { SOLACE_ADVOCATES_FORMATTED_TABLE_HEADERS, ADVOCATES_PAGE_TITLE, SEARCH_PLACEHOLDER, BANNER_TEXT, BANNER_CTA, EMAIL_SUBJECT_LINE, RESET_SEARCH } from "./constants/page";
import { formatAdvocates, AdvocateType, FormattedAdvocateType } from "./utils/formatAdvocates";
import "./page.css";
import Logo from "../../public/Logo";

export default function Home() {
  const [advocates, setAdvocates] = useState<FormattedAdvocateType[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<FormattedAdvocateType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) =>
      response.json().then((jsonResponse) => {
        const data: AdvocateType[] = jsonResponse.data;
        const formattedData = formatAdvocates(data);
        setAdvocates(formattedData);
        setFilteredAdvocates(formattedData);
      })
    );
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchValue(e.target.value); // Update the search input value
    const filtered = advocates.filter((advocate) =>
      Object.values(advocate).some((value) =>
        Array.isArray(value)
          ? value.some((item) => item.toString().toLowerCase().includes(searchTerm))
          : value.toString().toLowerCase().includes(searchTerm)
      )
    );
    setFilteredAdvocates(filtered);
  };

  const resetSearch = () => {
    setSearchValue("");
    setFilteredAdvocates(advocates);
    const searchInput = document.querySelector<HTMLInputElement>("input[type='text']");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const handleBannerCtaClick = () => {
      const email = "lilahraeaugust@gmail.com";
      const subject = EMAIL_SUBJECT_LINE;
  
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  
      window.location.href = mailtoUrl;
  }

  return (
    <>
      <div className="banner-green">
        <p>
          {BANNER_TEXT}
        </p>
        <span className="banner-cta" onClick={handleBannerCtaClick}>{BANNER_CTA}</span>
        <img src="https://cdn.prod.website-files.com/632a21d0ec93a082b11988a0/65d57a0fdb320cede78a4e8a_icon-arrow-right-white.svg" loading="lazy" width="15" alt=""></img>
      </div>
      <div className="advocates-page-root">
        <div className="nav-wrapper">
          <div className="page-logo">
            <Logo/>
          </div>
        </div>
        <div className="paper">
        <h1>{ADVOCATES_PAGE_TITLE}</h1>
        <div className="search-area">
          <input
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchValue}
            onChange={onSearchChange}
          />
          <button className="primary-button" onClick={resetSearch}>{RESET_SEARCH}</button>
        </div>
        <Table
          data={filteredAdvocates}
          columns={SOLACE_ADVOCATES_FORMATTED_TABLE_HEADERS}
          rowsPerPageOptions={[5, 10, 15]}
        />
        </div>
      </div>
    </>
  );
}



