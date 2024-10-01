import { Link } from "react-router-dom";

export function BlankPage() {
  return (
    <div id="empty-page-prompt" data-testid="blank-page">
      <h4 id="empty-page-text">This page is empty!</h4>Would you like to add a
      new list now?
      <Link to="/create-new/list">
        <button id="empty-page-button">OK &rarr;</button>
      </Link>
    </div>
  );
}
