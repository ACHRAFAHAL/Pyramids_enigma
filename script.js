document.addEventListener('DOMContentLoaded', () => {

    const timelineData = [
        { 
            id: 'djoser',
            name: 'Step Pyramid of Djoser', 
            date: 'c. 2630 BCE',
            description: 'The first pyramid, designed by the architect Imhotep. It was a revolutionary step, stacking six mastabas on top of each other. It used smaller blocks and inclined courses, a technique that would later prove less stable.',
            height: 60,
        },
        { 
            id: 'sneferu_bent',
            name: 'Bent Pyramid of Sneferu', 
            date: 'c. 2600 BCE',
            description: 'An ambitious first attempt at a true, smooth-sided pyramid. Structural issues on the sandy ground forced a dramatic change in angle from 54 to 43 degrees mid-construction, giving it its iconic bend.',
            height: 105,
        },
        { 
            id: 'sneferu_red',
            name: 'Red Pyramid of Sneferu', 
            date: 'c. 2590 BCE',
            description: 'Learning from past mistakes, Sneferu’s second pyramid was the first successful true pyramid. It was built with a consistent, safer 43-degree angle and used stable horizontal courses of stone, setting the template for Giza.',
            height: 105,
        },
        { 
            id: 'khufu',
            name: 'Great Pyramid of Khufu', 
            date: 'c. 2550 BCE',
            description: 'The pinnacle of pyramid building. The largest and most precise pyramid, it consists of 2.3 million blocks. Its construction marked the zenith of the state\'s power to organize labor and resources.',
            height: 146.6,
        },
        { 
            id: 'khafre',
            name: 'Pyramid of Khafre', 
            date: 'c. 2520 BCE',
            description: 'Slightly smaller than his father\'s, Khafre\'s pyramid appears taller as it\'s built on higher bedrock. It is famous for its associated Sphinx and still has some of its original polished limestone casing at the peak.',
            height: 143.5,
        }
    ];

    const theoriesData = {
        ramp: {
            title: 'External Ramp Systems',
            description: 'The most widely accepted theory. Proposes that massive ramps were built to drag the stone blocks up the side of the pyramid. These could have been straight, wrapping around the pyramid (corkscrew), or zig-zagging.',
            evidence: 'Remains of ramps found near some pyramids. Recent discovery of a steep ramp with postholes at Hatnub quarry shows Egyptians could handle very steep inclines.',
            challenges: 'A straight ramp would need to be enormous, potentially using more material than the pyramid itself. A corkscrew ramp would obscure sightlines, making precision difficult.',
            plausibility: [80, 20]
        },
        internal: {
            title: 'Internal Ramp Theory',
            description: 'A modern theory suggesting a short external ramp was used for the base, while a second, internal ramp corkscrewed up inside the pyramid itself. Cranes at the corners would turn the blocks.',
            evidence: 'Anomalies in micro-gravity scans suggest an internal spiral structure. An L-shaped room in the Great Pyramid aligns with a potential corner-turning point.',
            challenges: 'A compelling but largely theoretical model that is difficult to prove without more invasive analysis of the pyramids.',
            plausibility: [60, 40]
        },
        water: {
            title: 'Water-Lift Systems',
            description: 'This theory proposes that a system of canals, locks, and shafts allowed the Egyptians to use water to float or lift blocks up the structure. Water would be raised using shadufs or similar devices.',
            evidence: 'Clear evidence for water being used to TRANSPORT blocks to the site via canals from the Nile. The theory for LIFTING blocks is more speculative.',
            challenges: 'No direct archaeological evidence for complex water-lifting machinery has been found inside the pyramids. Sealing such a system would be an immense challenge.',
            plausibility: [30, 70]
        },
        concrete: {
            title: 'Geopolymer Concrete',
            description: 'A controversial theory suggesting that the blocks were not carved stone but were cast in place using a form of ancient concrete made from limestone slurry, mixed and poured at each level.',
            evidence: 'Proponents cite microscopic analysis showing minerals and air bubbles not typical of natural limestone. Some blocks have irregular shapes that fit perfectly together.',
            challenges: 'Vast quantities of wood would be needed for fuel to make the binder. The theory is rejected by most mainstream Egyptologists who argue the stone is clearly quarried.',
            plausibility: [10, 90]
        }
    };
    
    const buildersData = [
        {
            title: 'Dispelling a Myth',
            icon: '✅',
            content: 'The pyramid builders were not slaves. They were a mix of skilled, permanent employees and seasonal agricultural workers. Building the pyramids was a national project and a form of civic duty, for which workers were paid in rations of food, beer, and other goods.',
            type: 'text'
        },
        {
            title: 'Daily Rations',
            icon: '🍞',
            content: 'Workers were well-fed to sustain their hard labor. Their diet was rich in protein and carbohydrates, including bread, fish, cattle, sheep, and goat meat. Each worker received a daily wage of about 4-5 liters of beer, a primary source of calories and hydration.',
            type: 'chart',
            chartData: {
                labels: ['Beer', 'Bread', 'Fish & Meat', 'Vegetables'],
                data: [45, 30, 15, 10]
            },
            chartId: 'dietChart'
        },
        {
            title: 'A City of their Own',
            icon: '🏠',
            content: 'Archaeologists have excavated "Heit el-Ghurab," a planned city for the workers. It contained large galleries for sleeping, massive bakeries and kitchens capable of feeding thousands, and even a hospital where workers received medical attention for injuries sustained on the job.',
            type: 'text'
        },
        {
            title: 'The Human Cost',
            icon: '⚕️',
            content: 'Life was hard and dangerous. Skeletons of workers show high rates of arthritis, spinal damage, and broken bones. While they received medical care (many bones show signs of healing), their average lifespan was only 30-35 years, compared to 50-60 for the nobility.',
            type: 'chart',
            chartData: {
                labels: ['Pyramid Builder', 'Noble'],
                data: [35, 60]
            },
            chartId: 'lifespanChart'
        },
        {
            title: 'Team Spirit',
            icon: '🤝',
            content: 'The workforce was highly organized into crews and gangs. Graffiti left by these teams inside the pyramids reveals their names, such as "The Drunkards of Menkaure" or "The Friends of Khufu Gang." This shows a sense of pride, camaraderie, and team identity.',
            type: 'text'
        },
        {
            title: 'Tools of the Trade',
            icon: '⛏️',
            content: 'Lacking iron, workers used copper chisels and saws for soft limestone, which wore down quickly. For hard granite, they had to pound it with hard dolerite stones and use sand as an abrasive to slowly grind away the rock—a testament to their incredible patience and persistence.',
            type: 'text'
        }
    ];

    let pyramidHeightChartInstance;
    let theoryPlausibilityChartInstance;
    
    function initTimeline() {
        const timelineContainer = document.getElementById('timeline-content');
        timelineData.forEach((item, index) => {
            const isLeft = index % 2 === 0;
            const timelineElement = document.createElement('div');
            timelineElement.classList.add('timeline-item', 'relative', 'p-6', 'md:p-8', 'bg-papyrus', 'rounded-lg', 'shadow-md', 'md:w-5/12', 'lg:w-1/3');
            if (isLeft) {
                timelineElement.classList.add('ml-8', 'md:ml-auto', 'md:mr-[58%]');
            } else {
                timelineElement.classList.add('ml-8', 'md:ml-[58%]');
            }

            timelineElement.innerHTML = `
                <div class="absolute top-7 -left-10 md:left-auto md:top-1/2 md:-mt-3 ${isLeft ? 'md:-right-10 md:left-auto' : 'md:-left-10'}">
                    <div class="h-6 w-6 rounded-full accent-bg border-4 border-FDF8F0"></div>
                </div>
                <h5 class="text-xl font-bold accent-color">${item.name}</h5>
                <p class="text-sm font-semibold mb-2">${item.date}</p>
                <p>${item.description}</p>
            `;
            timelineElement.addEventListener('click', () => {
                if(pyramidHeightChartInstance) {
                    pyramidHeightChartInstance.data.datasets[0].backgroundColor = timelineData.map(d => d.id === item.id ? '#C08A57' : '#EFE6D8');
                    pyramidHeightChartInstance.update();
                }
            });
            timelineContainer.appendChild(timelineElement);
        });
    }

    function initPyramidHeightChart() {
        const ctx = document.getElementById('pyramidHeightChart').getContext('2d');
        pyramidHeightChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: timelineData.map(p => p.name.replace('Pyramid of ', '')),
                datasets: [{
                    label: 'Original Height (meters)',
                    data: timelineData.map(p => p.height),
                    backgroundColor: '#EFE6D8',
                    borderColor: '#C08A57',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        title: { display: true, text: 'Height (m)' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.dataset.label}: ${context.raw}m`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function updateTheoryDisplay(theoryKey) {
        const theory = theoriesData[theoryKey];
        const container = document.getElementById('theory-display');
        container.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h5 class="text-2xl font-bold accent-color mb-3">${theory.title}</h5>
                    <p class="font-semibold mb-1">How it works:</p>
                    <p class="mb-4">${theory.description}</p>
                    <p class="font-semibold mb-1">Evidence:</p>
                    <p class="mb-4">${theory.evidence}</p>
                    <p class="font-semibold mb-1">Challenges:</p>
                    <p>${theory.challenges}</p>
                </div>
                <div class="chart-container h-64 md:h-auto">
                    <canvas id="theoryPlausibilityChart"></canvas>
                </div>
            </div>
        `;
        // Store current theory for LLM expansion
        container.dataset.currentTheory = theoryKey;
        initTheoryPlausibilityChart(theory.plausibility);
    }

    function initTheoryPlausibilityChart(data) {
        if(theoryPlausibilityChartInstance) {
            theoryPlausibilityChartInstance.destroy();
        }
        const ctx = document.getElementById('theoryPlausibilityChart').getContext('2d');
        theoryPlausibilityChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Evidence-Based Plausibility', 'Challenges/Speculation'],
                datasets: [{
                    data: data,
                    backgroundColor: ['#C08A57', '#EFE6D8'],
                    borderColor: '#FDF8F0',
                    borderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: true, text: 'Scholarly Acceptance' }
                }
            }
        });
    }
    
    function initBuilderCards() {
        const grid = document.querySelector('#builders .grid');
        buildersData.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'bg-secondary-bg p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl';
            cardEl.innerHTML = `
                <div class="flex items-center mb-3">
                    <span class="text-3xl mr-4">${card.icon}</span>
                    <h5 class="text-xl font-bold">${card.title}</h5>
                </div>
                <p>${card.content}</p>
                ${card.type === 'chart' ? `<div class="chart-container mt-4 h-64"><canvas id="${card.chartId}"></canvas></div>` : ''}
            `;
            grid.appendChild(cardEl);
        });
        
        const dietCardData = buildersData.find(c => c.chartId === 'dietChart');
        if (dietCardData) {
            const dietCtx = document.getElementById('dietChart').getContext('2d');
            new Chart(dietCtx, {
                type: 'doughnut',
                data: {
                    labels: dietCardData.chartData.labels,
                    datasets: [{ data: dietCardData.chartData.data, backgroundColor: ['#a15c3e', '#e0ac69', '#6a6f58', '#9d9169'] }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }}}
            });
        }
        
        const lifespanCardData = buildersData.find(c => c.chartId === 'lifespanChart');
        if (lifespanCardData) {
            const lifespanCtx = document.getElementById('lifespanChart').getContext('2d');
            new Chart(lifespanCtx, {
                type: 'bar',
                data: {
                    labels: lifespanCardData.chartData.labels,
                    datasets: [{ label: 'Average Lifespan (Years)', data: lifespanCardData.chartData.data, backgroundColor: ['#a15c3e', '#e0ac69'] }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}}
            });
        }
    }

    // LLM Integration Functions
    async function callGemini(prompt, outputElement, loadingElement) {
        outputElement.textContent = '';
        outputElement.classList.add('hidden');
        loadingElement.classList.remove('hidden');

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyB78pYs3q40f8YNFcyC7rAAh3oxDZHUaec"; // Replace with your actual API key
        if (!apiKey) {
            console.error('API key is not set. Please set your API key.');
            outputElement.textContent = 'API key is not set. Please set your API key.';
            outputElement.classList.remove('hidden');
            loadingElement.classList.add('hidden');
            return;
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                outputElement.textContent = text;
                outputElement.classList.remove('hidden');
            } else {
                outputElement.textContent = 'Sorry, I could not generate a response. Please try again.';
                outputElement.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            outputElement.textContent = 'There was an error communicating with the Pyramid Scholar. Please try again later.';
            outputElement.classList.remove('hidden');
        } finally {
            loadingElement.classList.add('hidden');
        }
    }

    // Event Listeners for LLM Features
    document.getElementById('ask-scholar-btn').addEventListener('click', () => {
        const input = document.getElementById('scholar-input');
        const output = document.getElementById('scholar-text');
        const loading = document.getElementById('scholar-loading');
        const outputContainer = document.getElementById('scholar-output');
        const userQuery = input.value.trim();

        if (userQuery) {
            outputContainer.classList.remove('hidden');
            const prompt = `As an expert on ancient Egyptian pyramid construction, answer the following question: "${userQuery}" Be concise and informative.`;
            callGemini(prompt, output, loading);
        } else {
            output.textContent = 'Please enter a question for the Pyramid Scholar.';
            outputContainer.classList.remove('hidden');
            output.classList.remove('hidden');
            loading.classList.add('hidden');
        }
    });

    document.getElementById('expand-theory-btn').addEventListener('click', () => {
        const theoryDisplay = document.getElementById('theory-display');
        const currentTheoryKey = theoryDisplay.dataset.currentTheory;
        const theory = theoriesData[currentTheoryKey];
        const output = document.getElementById('expanded-theory-text');
        const loading = document.getElementById('expanded-theory-loading');
        const outputContainer = document.getElementById('expanded-theory-output');

        if (theory) {
            outputContainer.classList.remove('hidden');
            const prompt = `Elaborate on the "${theory.title}" theory for pyramid construction, focusing on its main arguments, key evidence, and major criticisms or counter-arguments. Keep it around 150-200 words.`;
            callGemini(prompt, output, loading);
        } else {
            output.textContent = 'Please select a theory first.';
            outputContainer.classList.remove('hidden');
            output.classList.remove('hidden');
            loading.classList.add('hidden');
        }
    });


    document.querySelectorAll('.theory-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.theory-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            updateTheoryDisplay(e.target.dataset.theory);
            // Clear previous expanded theory insights when a new tab is selected
            document.getElementById('expanded-theory-output').classList.add('hidden');
            document.getElementById('expanded-theory-text').textContent = '';
        });
    });
    
    document.getElementById('mobile-nav').addEventListener('change', function() {
        if(this.value) {
            window.location.hash = this.value;
        }
    });

    initTimeline();
    initPyramidHeightChart();
    // Initial display of the "ramp" theory
    updateTheoryDisplay('ramp');
    initBuilderCards();

    // Three.js specific code
    window.onload = function() {
        const container = document.getElementById('pyramid-3d-container');
        let scene, camera, renderer, loadedModel; // Renamed 'pyramid' to 'loadedModel' for clarity
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        // Initialize Three.js scene
        function initThreeJS() {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xEFE6D8); // Match secondary-bg
            

            // Camera
            camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(-40, 15, 20); // Adjust camera position for better view
            camera.rotation.set(0, 10, 0); // Adjust camera rotation for better view

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft white light
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Direct light from top-right
            directionalLight.position.set(5, 10, 7);
            scene.add(directionalLight);

            // --- START: Changes for GLB Model Loading ---
            // 1. Instantiate the GLTFLoader
            const loader = new THREE.GLTFLoader();

            // 2. Define the path to your .glb model
            const modelPath = 'pyramid_of_menkaure_giza_pyramid_complex_egypt.glb'; // REPLACE WITH YOUR .glb URL

            // 3. Load the .glb model
            loader.load(
                modelPath,
                function (gltf) {
                    // 1) Load the model
                    const modelScene = gltf.scene;

                    // 2) Create a pivot object
                    const pivot = new THREE.Object3D();
                    scene.add(pivot);

                    // 3) Add the model to the pivot
                    pivot.add(modelScene);

                    // 4) Scale the model first
                    modelScene.scale.set(0.2, 0.2, 0.2);

                    // 5) Now compute the bounding box (after scaling)
                    const bbox = new THREE.Box3().setFromObject(modelScene);
                    const center = bbox.getCenter(new THREE.Vector3());

                    // 6) Shift the model so its center is at the pivot origin
                    modelScene.position.sub(center);

                    // 7) Move pivot to the original center
                    pivot.position.copy(center);

                    // 8) Store the pivot as "loadedModel" so we can rotate around it
                    loadedModel = pivot;

                    console.log('GLB model loaded successfully:', loadedModel);
                },
                function (xhr) {
                    // This function is called while loading is progressing
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    // This function is called if there's an error during loading
                    console.error('Error loading GLB model:', error);
                }
            );

            // REMOVE the previous pyramid geometry and material as you're loading a GLB
            // const pyramidGeometry = new THREE.ConeGeometry(5, 7, 4); 
            // const pyramidMaterial = new THREE.MeshPhongMaterial({ color: 0xC08A57 });
            // pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
            // pyramid.rotation.y = Math.PI / 4; 
            // pyramid.position.y = pyramid.geometry.parameters.height / 2;
            // scene.add(pyramid); 
            // --- END: Changes for GLB Model Loading ---

            // Event Listeners for Interaction
            container.addEventListener('mousemove', onDocumentMouseMove);
            container.addEventListener('touchstart', onDocumentTouchStart);
            container.addEventListener('touchmove', onDocumentTouchMove);

            // Handle window resize
            window.addEventListener('resize', onWindowResize);
        }

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        }

        function onDocumentTouchStart(event) {
            if (event.touches.length === 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }

        function onDocumentTouchMove(event) {
            if (event.touches.length === 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }

        // Animation loop
        function animate() {
        requestAnimationFrame(animate);

        // Rotate the pivot (and thus the model) around its own Y-axis
        if (loadedModel) {
            loadedModel.rotation.y += 0.001; // Adjust speed as desired
        }

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

        initThreeJS();
        animate();
    };
});
