import React, { useEffect, useRef, useState } from "react";

import { Appbar } from "../components/Appbar"; // Assuming Appbar is a React component

import axios from "axios";

import { BACKEND_URL } from "../config";

import { useNavigate } from "react-router-dom";

import EditorJs from "@editorjs/editorjs";

import Header from "@editorjs/header";

interface PublishProps {

// Add any additional props needed for the component

}

export const Publish: React.FC<PublishProps> = () => {

const [title, setTitle] = useState("");

const [description, setDescription] = useState("");

const navigate = useNavigate();

const editorRef = useRef<EditorJs | null>(null); // Use useRef with type assertion

useEffect(() => {

if (!editorRef.current) {

const editor = new EditorJs({

holder: "editor",

tools: {

header: Header,

},

});

editorRef.current = editor;

}

}, []);

const handlePublish = async () => {

if (!editorRef.current) {

return; // Handle potential editor not initialized case

}

const content = await editorRef.current.save();

const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`, {

title,

content,

}, {

headers: {

Authorization: localStorage.getItem("token"),

},

});

navigate(`/blog/${response.data.id}`);

};

return (

<div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">

<Appbar />

<div className="h-screen flex justify-center w-full pt-8 mt-16">

<div className="max-w-screen-lg w-full">

<input

onChange={(e) => setTitle(e.target.value)}

type="text"

className="w-full bg-black border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

placeholder="Title"

/>

<textarea

onChange={(e) => setDescription(e.target.value)}

className="w-full mt-2 border border-gray-300 text-sm text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

placeholder="Description (optional)"

/>

<div id="editor" className="prose max-w-full min-h-screen bg-white"></div>

<button

onClick={handlePublish}

className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"

>

<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">

Post the Blog

</span>

</button>

</div>

</div>

</div>

);

};