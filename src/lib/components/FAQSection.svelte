<script>
/**
 * Reusable FAQ section for AEO (Answer Engine Optimization)
 * Renders questions/answers with semantic markup for search engines and AI
 * @type {Array<{question: string, answer: string}>}
 */
export let faqs = [];

/** Optional custom section title */
export let title = 'Frequently Asked Questions';

/** Optional id for anchor links */
export let sectionId = 'faq';
</script>

{#if faqs && faqs.length > 0}
	<section class="faq-section" id={sectionId} aria-labelledby="faq-heading">
		<h2 id="faq-heading" class="faq-section-title">{title}</h2>
		<p class="faq-section-desc">Expert answers from Dr. Jan Duffy, your Lone Mountain Heights real estate specialist</p>
		<div class="faq-list">
			{#each faqs as faq}
				<div class="faq-item" itemscope itemtype="https://schema.org/Question">
					<h3 class="faq-question" itemprop="name">{faq.question}</h3>
					<div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
						<p itemprop="text">{faq.answer}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.faq-section {
		background: white;
		padding: 2.5rem 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
		margin: 2rem 0;
		border: 1px solid #e2e8f0;
	}

	.faq-section-title {
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}

	.faq-section-desc {
		font-size: 0.95rem;
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.faq-item {
		padding: 1.25rem 0;
		border-bottom: 1px solid #e2e8f0;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-question {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
		line-height: 1.4;
	}

	.faq-answer p {
		margin: 0;
		font-size: 1rem;
		color: var(--text-color);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.faq-section {
			padding: 1.5rem 1rem;
		}

		.faq-section-title {
			font-size: 1.4rem;
		}
	}
</style>
