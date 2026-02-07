from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        try:
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000")

            # Wait for the decoder text to appear
            print("Waiting for SYSTEM.INIT...")
            page.wait_for_selector("text=SYSTEM.INIT_SEQUENCE_COMPLETE", timeout=15000)

            # Wait a bit for list animations
            time.sleep(3)

            # Take screenshot of initial state
            page.screenshot(path="verification/initial.png")
            print("Initial screenshot taken.")

            # Find first project
            print("Hovering first project...")
            # We look for the first element with class 'group' which wraps the project item
            project = page.locator(".group").first
            project.hover()

            # Wait for hover effect (image load + transition)
            time.sleep(2)

            # Take screenshot of hover state
            page.screenshot(path="verification/hover.png")
            print("Hover screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
