export const pages = [ "Main", "Settings" ]
export const page_to_title = {
  "Main": "Main",
  "Settings": "Settings",
}
export const page_to_component = {
  "Main": ({navigate}) => (
    <section style={{background: 'hsl(0 0% 7%)'}}>
      <h2>Main page</h2>
      <button onClick={navigate.bind(null, "Settings")}>Open Settings</button>
    </section>
  ),
  "Settings": () => (
    <section style={{background: 'hsl(0 0% 7%)'}}>
      Settings page
    </section>
  ),
}

