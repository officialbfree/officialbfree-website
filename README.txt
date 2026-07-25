B FREE — OFFICIAL SITE
======================================================================

WHAT'S IN THIS FOLDER
----------------------------------------------------------------------
index.html    Home page (hero video, out-now strip)
music.html    Music page (single, video, streaming links)
store.html    Store page (product grid)
about.html    About page (bio, highlights, press photos, booking, EPK)
style.css     The look of the site. You don't need to touch this.
script.js     ALL your text, links, and products. This is the file
              you edit.
assets/       Videos, photos, and your EPK PDF go here.


HOW TO EDIT TEXT AND LINKS
----------------------------------------------------------------------
1. Open script.js in any text editor (Notepad, TextEdit, VS Code).
2. Everything editable is in the SITE_CONTENT block at the very top.
   Every field has a plain-English comment explaining what it controls.
3. Anything marked [FILL IN: ...] is waiting on you. Replace the whole
   bracket with your text or link.
4. Save the file and refresh the browser. All four pages update,
   including the nav and footer.

Until a link is filled in, the site shows it as a dimmed "add link"
placeholder. It switches on by itself once the bracket is replaced
with a real link.


DROP IN YOUR MEDIA (exact filenames)
----------------------------------------------------------------------
Put these in the /assets folder, using these names:

  hero-video.mp4          Home page background video (10-30 sec, muted)
  hero-poster.jpg         Still image shown while the hero video loads
  comfy-cozy-video.mp4    Music video on the Music page
  video-poster.jpg        Still image shown on the music video before play
  product-1.jpg           Store photos (add product-4.jpg etc. as needed,
  product-2.jpg           and list them in script.js)
  product-3.jpg
  press-1.jpg             Press photos on the About page (portrait
  press-2.jpg             orientation looks best)
  press-3.jpg
  b-free-epk.pdf          Your press kit, wired to the Download EPK button

The images in /assets right now are labeled placeholders so the layout
is visible. Replace them with your files using the same names and
nothing else needs to change.


THE STORE
----------------------------------------------------------------------
The site can't take payments on its own. Each Buy button opens an
external checkout link instead, so pick whichever platform you'd
rather deal with:

  Fourthwall    built for artist merch specifically
  Gumroad       simplest to set up
  Shopify       Buy Button / product links
  Stripe        Payment Links, most control

Create your products there, copy each product's checkout link, and
paste it into "buyLink" for that product in script.js. Done.


THE STREAMING PLAYER
----------------------------------------------------------------------
On the Music page there's a placeholder box for a Spotify (or Apple
Music / YouTube) player. Open music.html and find the comment marked
STREAMING PLAYER EMBED. The steps are written right there.


PUTTING IT ONLINE
----------------------------------------------------------------------
Easiest: go to app.netlify.com/drop and drag this whole folder onto
the page. The site is live in seconds, free, and you can connect a
custom domain in Netlify's settings.

Also works: GitHub Pages, Vercel, or any static host. No build step,
no install. You can also just double-click index.html to preview the
site on your own computer before publishing.
