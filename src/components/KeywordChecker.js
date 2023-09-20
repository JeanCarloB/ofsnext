"use client";
import { useKeywords } from "@/app/context/KeywordProvider";
import React, { useState, useEffect } from "react";


const KeywordChecker = ({text}) => {
  const [isKeyword, setIsKeyword] = useState(false);
  const keywordsList=useKeywords();
  useEffect(() => {
    const key = keywordsList.includes(text.trim());
    setIsKeyword(key);
  }, [text]);
};

export default KeywordChecker;