---
blocks:
  - headline: This Big Text is Totally Awesome
    tagline: Here's some text above the other text
    text: |+
      Y aqui una pequena descripcion

      ![](/uploads/08.webp)

    _template: hero
  - headline: Welcome to the Tina Starter
    text: >
      This project is set up to show you the basics of working with Tina. You're
      looking at the landing page, which pulls content from
      content/pages/home.md, components from components/blocks, and puts them
      all together in pages/\[filename].tsx, all based on a schema defined in
      .tina/schema.ts.
    actions:
      - label: Get Started
        type: button
        icon: true
        link: /posts
      - label: Read Blog
        type: link
        icon: false
        link: /posts
    image:
      src: /uploads/tina-illustration.webp
      alt: Tina
    color: default
    _template: hero
  - items:
      - icon:
          color: red
          size: 2xl
          name: code
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
      - icon:
          color: primary
          size: 2xl
          name: like
        title: This Is a Feature
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          color: green
          size: 2xl
          name: shield
        title: Configurable Theme
        text: >-
          Edit global theme configuration with Tina. Change your theme's primary
          color, font, or icon set.
    color: tint
    _template: features
---

