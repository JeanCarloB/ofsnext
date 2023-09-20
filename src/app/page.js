"use client";

import TextEditor from "@/components/TextEditor";
import { useState, useEffect } from "react";
import {useKeywords} from '@/app/context/KeywordProvider';

export default function Home() {
  const keywordsList=useKeywords();
  return (
      <div>
        <TextEditor keywordsList={keywordsList} />
      </div>
  );
}
