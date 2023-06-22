import React, { useEffect } from "react";

import "./App.css";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getComments } from "./store/reducers/ActionCreaters";
import CommentsList from "./components/CommentsList";
import { IComment } from "./types/Icomment";
import FormForAddComments from "./components/FormForAddComments";



function App() {
  const dispatch = useAppDispatch();
   const { comments} = useAppSelector((state) => state.comments) as {
    comments: IComment[];
    isLoading: boolean;
    error: string | null;
  };
 

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div className="block">

      <CommentsList comments={comments} />
      <FormForAddComments/>
    </div>
  );
}

export default App;
