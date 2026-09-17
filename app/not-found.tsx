import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="information-paper">
    <p>404 · PAGE NOT FOUND</p>
    <h1>Let’s get you back to the guide.</h1>
    <p>This address does not match a public page on Sites by Agents.</p>
    <ul>
      <li><Link href="/guide">Read the complete written guide</Link></li>
      <li><Link href="/">Open the interactive book</Link></li>
      <li><Link href="/agents">Find resources for agents</Link></li>
    </ul>
  </main>;
}
