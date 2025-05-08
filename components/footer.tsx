import Link from "next/link"
import { Github, Mail, MapPin } from "lucide-react"
import { CreditsBadge } from "./credits-badge"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h1 className="text-4xl font-semibold mb-4">MCA <span style={{ color: '#28cee3' }}>26</span></h1>
            <p className="text-sm text-muted-foreground">
              Official website for the MCA batch of 2026 at the   (CET).
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contributors" className="text-muted-foreground hover:text-primary transition-colors">
                  Contributors
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-muted-foreground hover:text-primary transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/students" className="text-muted-foreground hover:text-primary transition-colors">
                  Students
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span> , Kerala, India</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:cetmca26@example.com" className="hover:text-primary transition-colors">
                  cetmca26@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/cetmca26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  github.com/cetmca26
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()}happlle. All rights reserved.</p>
        </div>
        <CreditsBadge />
      </div>
    </footer>
  )
}
