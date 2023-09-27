"use client";

import TextEditor from "@/components/TextEditor";
import {handleCompile,handleEval,handleScript} from '@/app/scripts/TextEditor/scripts';
export default function Home() {

  return (
      <div>
        <TextEditor 
        handleCompile={handleCompile} 
        handleEval={handleEval} 
        handleScript={handleScript}/>
      </div>
  );
}
