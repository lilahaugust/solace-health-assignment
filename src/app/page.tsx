"use client";

import React, { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import { SOLACE_ADVOCATES_TABLE_HEADERS, ADVOCATES_PAGE_TITLE, SEARCH_PLACEHOLDER, BANNER_TEXT, BANNER_CTA, EMAIL_SUBJECT_LINE } from "./constants";
import { AdvocateType } from "./types";
import "./page.css";
import Logo from "../../public/Logo";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateType[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) =>
      response.json().then((jsonResponse) => {
        const data: AdvocateType[] = jsonResponse.data;
        setAdvocates(data);
        setFilteredAdvocates(data);
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
      </div>
      <main className="advocates-page-root">
        <div className="page-logo">
          <Logo/>
        </div>
        <h1>{ADVOCATES_PAGE_TITLE}</h1>
        <div className="search-area">
          <input
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchValue}
            onChange={onSearchChange}
          />
          <button className="primary-button" onClick={resetSearch}>Reset Search</button>
        </div>
        <Table
          data={filteredAdvocates}
          columns={SOLACE_ADVOCATES_TABLE_HEADERS}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </main>
      <div className="banner-green"></div>
    </>
  );
}



