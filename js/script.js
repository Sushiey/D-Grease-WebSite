// Uncomment this code and replace 'YOUR_APP_ID' and 'dgreaseukltd' with your actual eBay API credentials when you have obtained them
/*

const ebayAppId = 'YOUR_APP_ID'; // Replace 'YOUR_APP_ID' with your eBay App ID
const sellerUsername = 'dgreaseukltd'; // Replace 'dgreaseukltd' with the seller's eBay username

// Construct the eBay Finding API URL
const apiUrl = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${ebayAppId}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=Seller&itemFilter(0).value=${sellerUsername}&paginationInput.entriesPerPage=10`;

// Fetch data from the eBay Finding API
fetch(apiUrl)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    // Process the API response data
    console.log(data); // Output the data to the console (replace with your processing logic)
  })
  .catch(error => {
    console.error('Error fetching eBay data:', error); // Log any errors that occur during fetching
  });

*/

// Example eBay items data 
const itemsData = [
    { 
        title: "M10 Spray Gun Cleaner £1,720.20 + VAT", 
        price: "£2,064.24", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/gZcAAOSw5dhbq3Vr/s-l300.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item1" with the actual URL for the item
    },
    { 
        title: "135 Speedy Clean Spray Gun Cleaner £1519.87 + VAT", 
        price: "£1,823.84", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/8~UAAOSwWGxan9lf/s-l300.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item2" with the actual URL for the item
    },
    { 
        title: "Spray Gun Cleaner DG173A Auto Washing Machine £1,860.25 + VAT", 
        price: "£2,232.30", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/MbsAAOSwMPxan-UB/s-l300.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item3" with the actual URL for the item
    },
    { 
        title: "P20 M Spray Gun Cleaner - £1796.74 + Vat", 
        price: "£2,156.08", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/g0MAAOSwGhRbq4lh/s-l300.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item4" with the actual URL for the item
    },
    { 
        title: "801-B DECA DISTILLLER £3625.50 + VAT", 
        price: "£4,350.60", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/X4YAAOSwt6NbtJmc/s-l300.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item5" with the actual URL for the item
    },
    { 
        title: "P20 M Spray Gun Cleaner - £1796.74 + Vat", 
        price: "£2,156.08", 
        imageURL: "https://i.ebayimg.com/thumbs/images/g/xQYAAOSwG3RbtIuR/s-l225.webp",
        url: "https://www.ebay.co.uk/str/dgreaseukltd" // Replace "https://www.example.com/item6" with the actual URL for the item
    },
];



// Function to display eBay items
function displayItems(items) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        // Create a div element for each item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Create an anchor tag for the item
        const itemLink = document.createElement('a');
        itemLink.href = item.url;
        itemLink.target = '_blank'; // Open link in a new tab

        // Create an image tag for the item
        const itemImage = document.createElement('img');
        itemImage.src = item.imageURL;
        itemImage.alt = item.title;

        // Create HTML content for the item
        itemLink.appendChild(itemImage);
        itemDiv.appendChild(itemLink);
        itemDiv.innerHTML += `<h3><a href="${item.url}" target="_blank">${item.title}</a></h3>`;
        itemDiv.innerHTML += `<p>${item.price}</p>`;

        // Append the item div to the items container
        itemsContainer.appendChild(itemDiv);
    });
}

// Display the eBay items when the page loads
displayItems(itemsData);

// Sorting options
function sortItems(event, sortBy) {
    event.preventDefault(); // Prevent the default anchor behavior

    let sortedItems;
    switch (sortBy) {
        case 'priceLowToHigh':
            sortedItems = itemsData.slice().sort((a, b) => parseFloat(getNumericPrice(a.price)) - parseFloat(getNumericPrice(b.price)));
            break;
        case 'priceHighToLow':
            sortedItems = itemsData.slice().sort((a, b) => parseFloat(getNumericPrice(b.price)) - parseFloat(getNumericPrice(a.price)));
            break;
        case 'bestMatch':
        default:
            sortedItems = itemsData; // No sorting needed for best match
            break;
    }
    displayItems(sortedItems);
}

// Function to extract numeric price from string
function getNumericPrice(priceString) {
    return parseFloat(priceString.replace('£', '').replace(',', ''));
}

// Filtering by product type
function filterItemsByType(event, productType) {
    event.preventDefault(); // Prevent the default anchor behavior
    const filteredItems = itemsData.filter(item => {
        if (productType === 'partsWasher') {
            return item.title.toLowerCase().includes('parts washer');
        } else if (productType === 'sprayGunCleaners') {
            return item.title.toLowerCase().includes('spray gun cleaner');
        } else {
            return !item.title.toLowerCase().includes('parts washer') &&
                !item.title.toLowerCase().includes('spray gun cleaner');
        }
    });
    displayItems(filteredItems);
}

sortItems('bestMatch');

