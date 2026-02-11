<script>
import OptimizedImage from './OptimizedImage.svelte';
import { NAP } from '$lib/schema.js';

// Before/after staging photos
const stagingPhotos = [
  {
    id: 'living-room',
    title: 'Living Room Transformation',
    before: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Modern living room with neutral colors, proper lighting, and decluttered space',
    improvements: [
      'Removed personal items',
      'Added modern furniture',
      'Improved lighting',
      'Neutral color palette',
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen Staging',
    before: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Clean, modern kitchen with updated appliances and fresh countertops',
    improvements: [
      'Deep cleaned appliances',
      'Updated hardware',
      'Fresh flowers',
      'Minimalist decor',
    ],
  },
  {
    id: 'master-bedroom',
    title: 'Master Bedroom Makeover',
    before: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Elegant master suite with luxury bedding and proper furniture placement',
    improvements: [
      'Luxury bedding',
      'Proper furniture scale',
      'Soft lighting',
      'Neutral colors',
    ],
  },
  {
    id: 'dining-room',
    title: 'Dining Room Setup',
    before: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Formal dining room with elegant table setting and proper lighting',
    improvements: [
      'Elegant table setting',
      'Proper lighting',
      'Minimal decor',
      'Clean lines',
    ],
  },
  {
    id: 'outdoor-space',
    title: 'Outdoor Living Area',
    before: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Inviting outdoor space with comfortable seating and desert landscaping',
    improvements: [
      'Comfortable seating',
      'Desert plants',
      'Clean patio',
      'Outdoor lighting',
    ],
  },
  {
    id: 'home-office',
    title: 'Home Office Staging',
    before: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1556909112-5b2b2b2b2b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description:
      'Professional home office with clean desk and organized storage',
    improvements: [
      'Clean desk setup',
      'Organized storage',
      'Professional lighting',
      'Minimal distractions',
    ],
  },
];

// Staging tips
const stagingTips = [
  {
    title: 'Declutter & Depersonalize',
    description:
      'Remove personal items, family photos, and excess furniture to help buyers envision themselves in the space.',
    icon: '🧹',
  },
  {
    title: 'Neutral Color Palette',
    description:
      'Use neutral colors on walls and furniture to appeal to the widest range of buyers.',
    icon: '🎨',
  },
  {
    title: 'Maximize Natural Light',
    description:
      'Clean windows, open curtains, and add mirrors to reflect light and make spaces feel larger.',
    icon: '☀️',
  },
  {
    title: 'Proper Furniture Scale',
    description:
      "Choose appropriately sized furniture that doesn't overwhelm the space or make rooms feel cramped.",
    icon: '🪑',
  },
  {
    title: 'Create Focal Points',
    description:
      'Highlight the best features of each room with strategic furniture placement and lighting.',
    icon: '✨',
  },
  {
    title: 'Curb Appeal',
    description:
      'First impressions matter - ensure the exterior is clean, well-maintained, and inviting.',
    icon: '🏡',
  },
];

let selectedPhoto = null;

function openPhoto(photo) {
  selectedPhoto = photo;
}

function closePhoto() {
  selectedPhoto = null;
}
</script>

<div class="staging-gallery">
	<div class="gallery-header">
		<h3>Home Staging Success Stories</h3>
		<p>See how professional staging transforms Lone Mountain Heights homes for maximum appeal and faster sales</p>
	</div>
	
	<!-- Before/After Gallery -->
	<div class="staging-grid">
		{#each stagingPhotos as photo}
      <div class="staging-card" on:click={() => openPhoto(photo)} on:keydown={(e) => e.key === 'Enter' && openPhoto(photo)} tabindex="0" role="button" aria-label="View staging photos for {photo.title}">
				<div class="photo-comparison">
					<div class="before-after">
						<div class="photo-container">
							<OptimizedImage 
								src={photo.before}
								alt="Before staging - {photo.title} in Lone Mountain Heights home"
								width={300}
								height={200}
								className="staging-photo"
							/>
							<div class="photo-label before">Before</div>
						</div>
						<div class="photo-container">
							<OptimizedImage 
								src={photo.after}
								alt="After staging - {photo.title} in Lone Mountain Heights home"
								width={300}
								height={200}
								className="staging-photo"
							/>
							<div class="photo-label after">After</div>
						</div>
					</div>
				</div>
				<div class="staging-info">
					<h4>{photo.title}</h4>
					<p>{photo.description}</p>
					<div class="improvements">
						{#each photo.improvements as improvement}
							<span class="improvement-tag">✓ {improvement}</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
	
	<!-- Staging Tips Section -->
	<div class="staging-tips">
		<h4>Professional Staging Tips</h4>
		<div class="tips-grid">
			{#each stagingTips as tip}
				<div class="tip-card">
					<div class="tip-icon">{tip.icon}</div>
					<div class="tip-content">
						<h5>{tip.title}</h5>
						<p>{tip.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- CTA Section -->
	<div class="staging-cta">
		<h4>Ready to Stage Your Lone Mountain Heights Home?</h4>
		<p>Dr. Jan Duffy provides expert staging consultation and can connect you with the best staging professionals in Las Vegas.</p>
		<div class="cta-buttons">
			<a href={NAP.telHref} class="btn btn-primary">Call {NAP.telDisplay}</a>
			<a href="/contact" class="btn btn-secondary">Schedule Consultation</a>
		</div>
	</div>
	
	<!-- Photo Modal -->
	{#if selectedPhoto}
    <div class="photo-modal" on:click={closePhoto} on:keydown={(e) => e.key === 'Escape' && closePhoto()}>
      <div class="modal-content" on:click|stopPropagation on:keydown|stopPropagation>
				<button class="close-button" on:click={closePhoto}>×</button>
				<div class="modal-photos">
					<div class="modal-before">
						<OptimizedImage 
							src={selectedPhoto.before}
							alt="Before staging - {selectedPhoto.title} in Lone Mountain Heights home"
							width={500}
							height={400}
							className="modal-photo"
						/>
						<div class="modal-label before">Before</div>
					</div>
					<div class="modal-after">
						<OptimizedImage 
							src={selectedPhoto.after}
							alt="After staging - {selectedPhoto.title} in Lone Mountain Heights home"
							width={500}
							height={400}
							className="modal-photo"
						/>
						<div class="modal-label after">After</div>
					</div>
				</div>
				<div class="modal-info">
					<h3>{selectedPhoto.title}</h3>
					<p>{selectedPhoto.description}</p>
					<div class="modal-improvements">
						<h4>Key Improvements:</h4>
						<ul>
							{#each selectedPhoto.improvements as improvement}
								<li>{improvement}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.staging-gallery {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.gallery-header {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.gallery-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.gallery-header p {
		color: var(--text-color);
		margin: 0;
	}
	
	.staging-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.staging-card {
		background: var(--warm-cream);
		border-radius: 12px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		cursor: pointer;
	}
	
	.staging-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}
	
	.photo-comparison {
		position: relative;
	}
	
	.before-after {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
	}
	
	.photo-container {
		position: relative;
		overflow: hidden;
	}
	
	
	.photo-label {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.photo-label.before {
		background: #ef4444;
	}
	
	.photo-label.after {
		background: var(--success-green);
	}
	
	.staging-info {
		padding: 1.5rem;
	}
	
	.staging-info h4 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.75rem 0;
	}
	
	.staging-info p {
		color: var(--text-color);
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}
	
	.improvements {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.improvement-tag {
		background: var(--accent-color);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}
	
	.staging-tips {
		background: var(--warm-cream);
		padding: 2rem;
		border-radius: 12px;
		margin-bottom: 2rem;
	}
	
	.staging-tips h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1.5rem 0;
		text-align: center;
	}
	
	.tips-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	
	.tip-card {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	
	.tip-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}
	
	.tip-content h5 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.tip-content p {
		font-size: 0.9rem;
		color: var(--text-color);
		margin: 0;
		line-height: 1.4;
	}
	
	.staging-cta {
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
	}
	
	.staging-cta h4 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.staging-cta p {
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
		font-size: 1.1rem;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
		min-width: 150px;
		text-align: center;
	}
	
	.btn-primary {
		background: var(--accent-color);
		color: white;
		border: 2px solid var(--accent-color);
	}
	
	.btn-primary:hover {
		background: var(--accent-light);
		border-color: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background: transparent;
		color: var(--accent-color);
		border: 2px solid var(--accent-color);
	}
	
	.btn-secondary:hover {
		background: var(--accent-color);
		color: white;
		transform: translateY(-2px);
	}
	
	.photo-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}
	
	.modal-content {
		background: white;
		border-radius: 12px;
		max-width: 1000px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
	}
	
	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: var(--text-light);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.3s ease;
		z-index: 1001;
	}
	
	.close-button:hover {
		background: var(--tertiary-color);
	}
	
	.modal-photos {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding: 2rem;
	}
	
	.modal-before,
	.modal-after {
		position: relative;
	}
	
	
	.modal-label {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 600;
	}
	
	.modal-label.before {
		background: #ef4444;
	}
	
	.modal-label.after {
		background: var(--success-green);
	}
	
	.modal-info {
		padding: 0 2rem 2rem 2rem;
	}
	
	.modal-info h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.modal-info p {
		color: var(--text-color);
		margin: 0 0 1.5rem 0;
		line-height: 1.5;
	}
	
	.modal-improvements h4 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.75rem 0;
	}
	
	.modal-improvements ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.modal-improvements li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #e5e7eb;
		position: relative;
		padding-left: 1.5rem;
	}
	
	.modal-improvements li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success-green);
		font-weight: 700;
	}
	
	.modal-improvements li:last-child {
		border-bottom: none;
	}
	
	@media (max-width: 768px) {
		.staging-grid {
			grid-template-columns: 1fr;
		}
		
		.before-after {
			grid-template-columns: 1fr;
		}
		
		.tips-grid {
			grid-template-columns: 1fr;
		}
		
		.tip-card {
			flex-direction: column;
			text-align: center;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 200px;
		}
		
		.modal-photos {
			grid-template-columns: 1fr;
		}
		
		.modal-content {
			margin: 1rem;
		}
	}
</style>
