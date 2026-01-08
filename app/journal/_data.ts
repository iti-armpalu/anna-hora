export interface JournalArticle {
    id: number
    slug: string
    title: string
    excerpt: string
    author: string
    date: string
    readTime: string
    category: string
    categoryName: string
    image: string
    featured: boolean
    content?: string
}

export interface RelatedArticle {
    id: number
    slug: string
    title: string
    category: string
    image: string
    readTime: string
}

export interface JournalCategory {
    id: string
    name: string
}

export const journalCategories: JournalCategory[] = [
    { id: "all", name: "All Stories" },
    { id: "style", name: "Style & Wardrobe" },
    { id: "self-care", name: "Self-Care & Rituals" },
    { id: "home", name: "Home & Atmosphere" },
    { id: "behind-brand", name: "Behind the Brand" },
    { id: "gift-guides", name: "Gift Guides" },
]

export const journalArticles: JournalArticle[] = [

    {
        id: 1,
        slug: "featured-in-elle-czechia-anna-hora-silk-loungewear",
        title: "Featured in ELLE Czechia: Anna Hora Silk Loungewear",
        excerpt: "ELLE Czechia spotlights Anna Hora’s silk loungewear—celebrating its featherlight drape, considered tailoring, and bold femininity.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "ANNA HORA Editorial Team",
        date: "January 5, 2026",
        readTime: "5 min read",
        image: "/journal/journal-entry-1.jpeg",
        featured: true,
        content: `
        <p>When a brand is featured in print, the moment is often framed as an arrival. But sometimes, it reads more like recognition—a quiet acknowledgement of work that has been moving steadily, without urgency or excess.</p>
        
        <p>Anna Hora’s feature in ELLE Czechia felt like that kind of moment. Observant rather than celebratory. Attentive rather than declarative.</p>
        
        <h3>A Focus on Fabric</h3>
        
        <p>At the centre of the feature was silk—its weight, its movement, and the way it responds to the body. Shown in loungewear form, the fabric was allowed to speak for itself. Featherlight, fluid, and responsive, it carried the sense of ease that defines the Anna Hora approach.</p>
        
        <p>The garments were not positioned as occasion pieces, but as part of a lived wardrobe—worn, relaxed, and familiar.</p>
        
        <h3>Considered Tailoring</h3>
        
        <p>What stood out was the attention to proportion and cut. The tailoring was subtle, almost invisible, shaping the garment without imposing structure. This restraint allowed the silk to move freely, creating silhouettes that feel intentional without feeling fixed.</p>
        
        <p>In the editorial context, this balance between softness and definition became the quiet anchor of the story.</p>
        
        <h3>Femininity Without Performance</h3>
        
        <p>The feature framed femininity not as spectacle, but as presence. The pieces carried confidence through simplicity rather than embellishment. There was no sense of costume—only comfort, clarity, and control.</p>
        
        <p>This interpretation felt aligned with the brand’s understanding of femininity as something internal and self-directed.</p>
        
        <h3>Placed in Context</h3>
        
        <p>ELLE Czechia approached the collection with a cultural lens, situating the garments within everyday life rather than isolating them as fashion objects. The result was an editorial that felt grounded, observing how silk loungewear can exist beyond private spaces.</p>
        
        <p>It was less about styling and more about atmosphere.</p>
        
        <h3>Continuity Over Moment</h3>
        
        <p>After the feature, the work continues unchanged. The same focus on material, movement, and wearability remains at the centre of the brand. Press does not alter process—it simply reflects it back.</p>
        
        <p>The recognition was appreciated, but not disruptive. A pause, a marker, and then a return to making.</p>
        
        <p>Being featured is temporary. The relationship between fabric and wearer is not.</p>
        `        
    },
    {
        id: 2,
        slug: "styling-loungewear-beyond-home",
        title: "Styling Loungewear Beyond the Home: Effortless Elegance",
        excerpt: "How silk trousers and everyday staples come together to create a relaxed, wearable uniform beyond the home.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "ANNA HORA Editorial Team",
        date: "December 12, 2025",
        readTime: "7 min read",
        image: "/journal/journal-entry-2.jpeg",
        featured: false,
        content: `
<p>There’s a quiet shift that happens when loungewear leaves the home. What was once reserved for private moments becomes part of public life, asking new questions of comfort, confidence, and intention. The line between inside and outside has blurred, and with it, our understanding of how clothes should function.</p>

<p>Silk trousers sit right at the center of this shift. Soft by nature, fluid in movement, they carry an intimacy that feels almost contradictory when worn on the street. And yet, paired thoughtfully, they feel entirely at home.</p>

<h3>Starting With Ease</h3>

<p>The foundation of this look is simplicity. The ANNA HORA silk pants are not styled as a statement piece, but as a base layer—something you build around rather than spotlight. Their movement introduces softness, while their silhouette keeps things grounded.</p>

<p>Rather than dressing them up, the choice here is to let them exist alongside everyday staples. This is silk worn without ceremony.</p>

<h3>Structure as Balance</h3>

<p>A classic trench coat adds a sense of familiarity. Its structured shape contrasts the fluidity of the trousers, creating a quiet tension between tailored and relaxed. This balance is what allows the outfit to move easily through different settings—indoors, outdoors, morning to evening.</p>

<p>The trench doesn’t compete with the silk. It simply holds the look together.</p>

<h3>Casual Elements That Shift the Mood</h3>

<p>A baseball cap and sneakers change the conversation entirely. They pull the silk trousers out of any formal context and place them firmly in daily life. These pieces suggest movement, unpredictability, and a certain practicality.</p>

<p>The result is an outfit that feels lived-in rather than styled—something worn because it feels right, not because it makes a point.</p>

<h3>Texture Over Trends</h3>

<p>What makes this combination work isn’t trend alignment, but texture. Silk against cotton, wool, leather, rubber. Each material reacts differently to light and movement, creating interest without excess.</p>

<p>This kind of dressing prioritizes how clothes feel over how they read. It’s less about the visual statement and more about the experience of wearing them.</p>

<h3>Accessories as Quiet Companions</h3>

<p>The jewelry and bag in this look are subtle, almost secondary. They don’t define the outfit, but they add weight and intention. These are pieces chosen to stay on—items that don’t require adjustment throughout the day.</p>

<p>They reinforce the idea of continuity: getting dressed once and letting the day unfold.</p>

<h3>Living Beyond Categories</h3>

<p>Loungewear, workwear, casualwear—these categories feel increasingly irrelevant. What matters instead is adaptability. Clothes that move with you, that don’t ask to be changed when plans shift or days extend.</p>

<p>Silk trousers can belong here too. Not as an exception, but as part of a broader wardrobe language that values comfort, texture, and ease.</p>

<p>Styling loungewear beyond the home isn’t about elevation. It’s about integration—allowing softness into everyday life, and letting clothes support how you actually move through the world.</p>
`
    },
    {
        id: 3,
        slug: "style-and-wardrobe-small-things-that-carry-you",
        title: "Style & Wardrobe: The Small Things That Carry You",
        excerpt: "A reflection on personal objects, everyday rituals, and how what we wear becomes part of how we move through the day.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "ANNA HORA Editorial Team",
        date: "December 18, 2025",
        readTime: "6 min read",
        image: "/journal/journal-entry-3.jpeg",
        featured: false,
        content: `
    <p>Some of the most meaningful parts of our wardrobe aren’t garments at all. They’re the objects we reach for without thinking—the things that live in our hands, our bags, our pockets. These are the items that quietly accompany us through the day, shaping our routines more than we realize.</p>
    
    <p>This edit focuses on those in-between pieces. Not outfits, but fragments of daily life that sit somewhere between function and familiarity.</p>
    
    <h3>Clothes That Feel Personal</h3>
    
    <p>The silk shorts at the center of this look are relaxed, almost incidental. They don’t demand attention. Like many pieces we wear at home or on quieter days, they exist primarily for comfort. Their value lies in how easily they fit into the rhythm of the day—soft, breathable, unrestrictive.</p>
    
    <p>They are the kind of garment that doesn’t need a plan. You put them on, and the day adjusts around them.</p>
    
    <h3>Objects of Routine</h3>
    
    <p>A hairbrush left within reach. A face mist used almost automatically. These are not indulgences, but habits—small acts of care that anchor the day. They mark transitions: getting ready, stepping out, returning home.</p>
    
    <p>Over time, these objects become extensions of ourselves. Their presence is reassuring, their use instinctive.</p>
    
    <h3>Carried, Not Styled</h3>
    
    <p>Accessories in this context aren’t chosen to complete an outfit. They’re chosen because they’re useful. A compact bag that holds only what’s necessary. Wireless headphones that signal movement or solitude. A cap worn more for comfort than statement.</p>
    
    <p>These are items that are carried, not styled. They accumulate meaning through repetition.</p>
    
    <h3>Color as Continuity</h3>
    
    <p>The palette here is intentional but subtle. Deep reds and muted tones create a sense of cohesion without feeling curated. Color becomes a thread rather than a focal point—something that ties disparate pieces together quietly.</p>
    
    <p>It’s less about coordination and more about familiarity.</p>
    
    <h3>Jewelry as a Constant</h3>
    
    <p>A simple chain worn close to the body acts as a constant presence. Unlike clothing, it doesn’t change with the day. It stays on through transitions, becoming part of the wearer rather than the outfit.</p>
    
    <p>These kinds of pieces often hold personal significance, even when their meaning isn’t visible.</p>
    
    <h3>Living With Your Wardrobe</h3>
    
    <p>This is what a wardrobe looks like when it’s lived in rather than assembled. Pieces accumulate slowly, chosen for how they feel rather than how they photograph. Over time, they begin to reflect not just personal style, but personal rhythm.</p>
    
    <p>Style, in this sense, isn’t about expression. It’s about continuity—about surrounding yourself with things that support you quietly as you move through the day.</p>
    `
    },    
    {
        id: 4,
        slug: "style-and-wardrobe-soft-structure-everyday",
        title: "Style & Wardrobe: Soft Structure for Everyday Living",
        excerpt: "A reflection on knitwear, silk shorts, and the quiet objects that shape slower, more intentional days.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "ANNA HORA Editorial Team",
        date: "December 26, 2025",
        readTime: "5 min read",
        image: "/journal/journal-entry-4.jpeg",
        featured: false,
        content: `
        <p>Some days call for structure, others for softness. Most require a balance of both. This edit sits comfortably in that in-between space—where clothing is chosen not for occasion, but for how it supports the rhythm of the day.</p>
        
        <p>The pieces here are familiar, understated, and reassuring. Nothing feels excessive. Everything feels considered.</p>
        
        <h3>The Weight of Knitwear</h3>
        
        <p>A grey knit turtleneck sets the tone. Its texture introduces warmth and a sense of containment, creating a feeling of being held rather than styled. Knitwear like this carries its own quiet authority—it doesn’t ask for attention, but it defines the silhouette.</p>
        
        <p>Worn loosely, it softens the formality often associated with winter layers.</p>
        
        <h3>Silk as a Counterpoint</h3>
        
        <p>The ANNA HORA silk shorts provide contrast. Light, fluid, and patterned, they offset the density of the knit above. Silk here is not precious or decorative—it’s practical, breathable, and grounding.</p>
        
        <p>Paired with heavier textures, the shorts become part of an everyday uniform rather than a statement piece.</p>
        
        <h3>Supporting Layers</h3>
        
        <p>Thick grey socks extend the sense of comfort. They suggest time spent indoors, slower movement, and ease. Like the knit, they prioritise feeling over form, reinforcing the idea that comfort and intention can coexist.</p>
        
        <p>These are pieces chosen for how they feel throughout the day, not just how they appear.</p>
        
        <h3>Objects That Live Alongside Us</h3>
        
        <p>Scattered around the outfit are the quiet companions of daily life. A hand cream kept close. A scented candle waiting to be lit. A magazine left open, mid-read. These objects don’t complete an outfit, but they complete a moment.</p>
        
        <p>They point to routines rather than events.</p>
        
        <h3>Jewelry as Continuity</h3>
        
        <p>A delicate gold chain rests lightly against the body, unchanged throughout the day. Unlike clothing, it remains constant—moving from morning to evening without interruption.</p>
        
        <p>These kinds of pieces become personal markers, worn more for familiarity than adornment.</p>
        
        <h3>A Wardrobe That Supports Living</h3>
        
        <p>This is what a wardrobe looks like when it is built around lived experience rather than categories. Knitwear, silk, and everyday objects come together not to impress, but to support.</p>
        
        <p>Style here is quiet. It adapts, it softens, and it stays close—allowing the day to unfold without resistance.</p>
        `
    },
    
]

export const getFeaturedArticles = () => journalArticles.filter((article) => article.featured)
export const getArticleBySlug = (slug: string) => journalArticles.find((article) => article.slug === slug)
export const getArticlesByCategory = (category: string) =>
    journalArticles.filter((article) => article.category === category)
export const getAllArticles = () => journalArticles
export const getCategories = () => journalCategories


// Helper function to get article by slug


// Helper function to get related articles (excluding current article)
export function getRelatedArticles(currentArticleId: number, limit = 3): RelatedArticle[] {
    return journalArticles
        .filter((article) => article.id !== currentArticleId)
        .slice(0, limit)
        .map((article) => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            category: article.categoryName,
            image: article.image,
            readTime: article.readTime,
        }))
}

